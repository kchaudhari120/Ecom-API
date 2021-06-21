const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost/ecomm'

async function createConnection(){
    console.log('connection creating...');
    const connection = await mongoose.connect(DB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })

    if (connection) {
        console.log('connected...');
    } else {
       console.log('Something wrong...'); 
    }
    
}

module.exports = createConnection