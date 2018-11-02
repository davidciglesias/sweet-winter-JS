const http = require('http');
const url = require('url');
const dbSettings = require('../config/dbSettings')
const database = require('../classes/database')
const port = 2000
const getLevelsById = require('../methods/getLevelsById')
const postLevelsById = require('../methods/postLevelsById')

http.createServer(async (request, response) => {
    request.on('error', (err) => {
        console.error(err)
    });
    
    response.on('error', (err) => {
        console.error(err)
    });

    const dbConnection = new database(dbSettings)
    const parsedUrl = url.parse(request.url, true)
    const pathName = parsedUrl.pathname
    const query = parsedUrl.query

    if(request.method === "GET" 
    && pathName === '/getLevelsById' 
    && query.id !== undefined) {
        var result = await getLevelsById(dbConnection, query.id)
        if(result === undefined) {
            response.statusCode = 404
            response.end()
        } else {
            response.setHeader('Content-Type', 'application/json')
            response.setHeader('X-Powered-By', 'Winter!')
            response.statusCode = 200
            response.end(JSON.stringify(result))
        }
    } 
    else if(request.method === "POST" 
        && pathName === '/postLevelsById' ) {
            var body = ''
            request.on('data', async function (data) {
                body += data.toString();
            });
            request.on('end', async function () {
                try {
                    var postRequestJson = JSON.parse(body)
                }
                catch(err) {
                    response.statusCode = 500
                    response.end()
                }

                if(postRequestJson === undefined 
                || postRequestJson.id === undefined
                || postRequestJson.poo_level === undefined
                || postRequestJson.pet_level === undefined
                || postRequestJson.feed_level === undefined
                || postRequestJson.play_level === undefined) {
                    response.statusCode = 400
                    response.end()    
                }
                else {
                    var result = await postLevelsById(dbConnection, postRequestJson)
                    if(result) {
                        response.statusCode = 200
                    } else {
                        response.statusCode = 400
                    }
                    response.end()
                }
            });
    } else {
        response.statusCode = 400
        response.end()
    }
}).listen(port)