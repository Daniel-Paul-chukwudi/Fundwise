require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 1234
const cors = require('cors')
const sequelize = require('./Database/database')
const userRouter = require('./route/userRouter')


const app = express()
app.use(express.json())
app.use(userRouter);

app.use(cors())
//app.use('/', (req, res) => {
  //res.send('Connected to Backend Server')
//});
// console.log("hello");


const Startserver = async ()=>{ 
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    }
}

Startserver();

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`);
    
})