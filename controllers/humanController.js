import db from '../dbConnection.js'

export const getHumanDex = async (req, res) => {
    const query = `
        select 
            *
        from
            humans
    `
    db.query(query, (err, data) => {
        if(err)
            return res.json(err)
        else{
            console.log(`Retrieved ${data.length} Pokédex Entries`)
            return res.json(data)
        }
    })
}
export const getHumanDexEntry = async (req, res) => {
    const id = req.params.id;
    let condition = parseInt(id) ? `human_id = ?` : `name = ?`;
    const query = `
            select
                *
            from
                humans
            where
                ${condition}`
    db.query(query, id, (err, data) => {
        if(err)
            return res.json(err)
        else {
            console.log(`Retrieved Pokédex Entry for ${id}`)
            return res.json(data)
        }
    })
}