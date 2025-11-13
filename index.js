import express from "express"
import mysql from "mysql2"
import cors from "cors"
import router from './routes/routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', router)

app.listen(3030, () => {
    console.log("connected")
})