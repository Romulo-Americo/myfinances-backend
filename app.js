const express = require ('express')
const app = express()
const router = require('./router/router')
const cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(router);

app.listen(3000, (req, res) =>{
    console.log("O servidor esta rodando na porta: http://localhost:3000")
})