const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(express.json())
app.use(morgan('dev'))

app.listen(3001,()=>{
    console.log("server starting on port number 3001");
})

app.get('/', (req, res )=>{
    res.json({message : 'success'})
})