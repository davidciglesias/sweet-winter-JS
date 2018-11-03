module.exports = async (database, json) => {
    console.log(json)
    let sql =   `UPDATE sweet_winter.user_values
                SET poo_level = ${json.poo_level}, 
                    pet_level = ${json.pet_level},
                    play_level = ${json.play_level},
                    feed_level = ${json.feed_level},
                    score = ${json.score}
                WHERE iduser_values = ${json.id};`
    var result
    await database.query(sql)
                  .then(() => {result = true; database.close();})
                  .catch((err) => {result = false; database.close(); console.log(err)})
    return result 
}