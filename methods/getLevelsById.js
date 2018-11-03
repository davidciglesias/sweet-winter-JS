module.exports = async (database, id) => {
    let sql = `SELECT poo_level, pet_level, play_level, feed_level, score FROM sweet_winter.user_values WHERE iduser_values = ${id}`
    var poo_levels = 0
    var pet_levels = 0
    var play_levels = 0
    var feed_levels = 0
    var score = 0
    await database.query(sql)
            .then((rows) => {
                if(rows.length > 0) {
                    poo_levels = rows[0].poo_level
                    pet_levels = rows[0].pet_level
                    play_levels = rows[0].play_level
                    feed_levels = rows[0].feed_level
                    score = rows[0].score
                }
                database.close();
            })
    return {
        poo_levels: poo_levels,
        pet_levels: pet_levels,
        play_levels: play_levels,
        feed_levels: feed_levels,
        score: score
    } 
}