const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const dbConfig = require('./config/dbConfig')

const app = express()

mongoose.connect(process.env.DATABASE_URL
).then(()=>{
    console.log("connected to the database");
}).catch((err)=>{
    console.log("error connecting to the database", err);
}
)

const userRoutes = require('./routes/userRoutes');
const { $where } = require('./models/userModel');


app.use(cors())
app.use(express.json())
app.use('/api/users' , userRoutes)



const PORT = 8081




app.listen(PORT , ()=>{
    console.log("server running on port 8081");
})