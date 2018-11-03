const http = require('http')
const https = require('https')
const fs = require('fs')
const url = require('url')
const dbSettings = require('../config/dbSettings')
const database = require('../classes/database')
const port = 2000
const getLevelsById = require('../methods/getLevelsById')
const postLevelsById = require('../methods/postLevelsById')

var httpOptions = {

    key: fs.readFileSync("certificates/privatekey.pem"),
    
    cert: fs.readFileSync("certificates/certificate.pem")
}

http.createServer(async (request, response) => {
    request.on('error', (err) => {
        console.error(err)
    });
    
    response.on('error', (err) => {
        console.error(err)
    });

    
    const parsedUrl = url.parse(request.url, true)
    const pathName = parsedUrl.pathname
    const query = parsedUrl.query

    if (pathName && pathName.split("/").pop() === 'favicon.ico') {
        response.statusCode = 204;
        response.end()
    }
    else {
        if(request.method === "GET"
        && pathName === '/getLevelsById' 
        && query.id !== undefined) {
            const dbConnection = new database(dbSettings)
            var result = await getLevelsById(dbConnection, query.id)
            
            if(result === false) {
                response.statusCode = 404
                response.end()
            } else {
                response.setHeader('Content-Type', 'text/plain')
                response.setHeader('X-Content-Type-Options', 'nosniff')
                response.setHeader('Access-Control-Allow-Origin', '*')
                response.statusCode = 200
                response.write(JSON.stringify(result))
                response.end()
            }
        } 
        else if(request.method === "POST" 
            && pathName === '/postLevelsById' ) {
                const dbConnection = new database(dbSettings)
                
                var body = ''
                request.on('data', async function (data) {
                    body += data.toString();
                });
                request.on('end', async function () {
                    try {
                        var postRequestJson = JSON.parse(body)
                    }
                    catch(err) {
                        response.statusCode = 400
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
    }
}).listen(port)

console.log(`Application at: ${port}`)