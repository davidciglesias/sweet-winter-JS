module.exports = async (database, json) => {
    console.log(json.id)
    console.log(json.poo_level)
    console.log(json.pet_level)
    console.log(json.play_level)
    console.log(json.feed_level)
    let sql =   `UPDATE sweet_winter.user_values
                SET poo_level = ${json.poo_level}, 
                    pet_level = ${json.pet_level},
                    play_level = ${json.play_level},
                    feed_level = ${json.feed_level}
                WHERE iduser_values = ${json.id}`
    var result
    await database.query(sql)
                  .then(() => result = true)
                  .catch(() => result = false)
    return result 
}