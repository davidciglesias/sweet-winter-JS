module.exports = async (database, id) => {
    let sql = `SELECT poo_level, pet_level, play_level, feed_level FROM sweet_winter.user_values WHERE iduser_values = ${id}`
    var poo_levels = []
    var pet_levels = []
    var play_levels = []
    var feed_levels = []
    await database.query(sql)
            .then((rows) => {
                if(rows.length > 0) {
                    poo_levels.push(rows[0].poo_level)
                    pet_levels.push(rows[0].pet_level)
                    play_levels.push(rows[0].play_level)
                    feed_levels.push(rows[0].feed_level)
                }
            })
    return {
        poo_levels: poo_levels,
        pet_levels: pet_levels,
        play_levels: play_levels,
        feed_levels: feed_levels
    } 
}