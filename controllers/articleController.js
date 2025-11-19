import { json } from 'express';
import fs from 'node:fs';

export const getCompleteArticle = async (req, res) => {
    const id = req.params.name
    const path = `./articles/${id}/`
    try {
        const results = new Promise((resolve, reject) => {
            const data = {}
            fs.readdir(path, (err, files) => {
                console.log(`looking for ${id} files`)
                if(err)
                    return res.json({summary: "No files found."})
                else {
                    files.forEach((file) => {
                        console.log(`- ${file}`)
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
            .then(result => { return res.status(200).json(result) })
            .catch(result => { 
                console.log(result)
                return res.status(404).json({summary: "no files found"})
            })
    } catch(err) {
        console.log(err)
    }
}
export const addSegment = async (req, res) => {
    const folder = req.params.id
    const file = req.body.file
    const text = req.body.text || ''
    const path = `./articles/${folder}/${file}.txt`

    fs.writeFile(path, text, err => {
        if(err) {
            console.log(err)
            return res.status(500).json({error: `could not create ${file}`})
        }
        else {
            console.log(`created ${path}`)
            return res.status(200).json({message: `created ${folder}/${file}.txt`})
        }
    })
}
export const deleteSegment = async (req, res) => {
    const folder = req.params.id
    const file = req.body.file

    console.log(`attempting to delete /${folder}/${file}`)


    fs.unlink(`./articles/${folder}/${file}.txt`, err => {
        if(err)
            return res.status(500).json({error: "Something went wrong!"})
        else
            return res.status(200).json({message: `/${folder}/${file}.txt was deleted`})
    })


}