import db from '../dbConnection.js'
import { getCompleteArticle } from './articleController.js'

export const getPokedex = async (req, res) => {
    const query = `
        select 
            *
        from
            pokedex
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
export const getPokedexEntry = async (req, res) => {
    const id = req.params.id;
    let condition = parseInt(id) ? `p1.pokedex_id = ?` : `p1.name = ?`;
    const query = `
            select
                p1.*,
                p2.name as evolution
            from
                pokedex p1
            left join 
                pokedex p2 on 
                p1.evolves_to = p2.pokedex_id
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