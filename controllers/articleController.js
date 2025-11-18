import { json } from 'express';
import fs from 'node:fs';

export const getCompleteArticle = async (req, res) => {
    const id = req.params.name
    const path = `./articles/${id}/`
    try {
        const results = new Promise((resolve, reject) => {
            console.log("begin promise")
            const data = {}
            fs.readdir(path, (err, files) => {
                console.log(`looking for ${id} files`)
                if(err)
                    return res.json(err)
                else {
                    files.forEach((file) => {
                        console.log(`- found ${file}`)
                        const label = file.replace('.txt', '')
                        fs.readFile(`${path}${file}`, 'utf8', (err, text) => {
                            if(err)
                                reject(err)
                            else {
                                data[`${label}`] = text
                                if(files.length === Object.keys(data).length)
                                    resolve(data)
                            }
                        })  
                    })
                }
            })
        })
        results
            .then(result => { return res.json(result) })
            .catch(result => { 
                console.log(result)
                return res.json({empty: "no files found"})
            })
    } catch(err) {
        console.log(err)
    }
}