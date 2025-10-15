require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT
const cors = require('cors')
const axios = require('axios')
const sequelize = require('./Database/database')
const userRouter = require('./route/userRouter')


const app = express()
app.use(express.json())
app.use(cors())

app.use(userRouter)
// const test = async (req,res)=>{
// const KORA_API_URL = `https://api.korapay.com/merchant/api/v1/identities/ng/nin`
// try {
    
// const response = await axios.post(
//     KORA_API_URL,
//     {
//         "id": "233871863509",
//         "verification_consent": true,
// //         "validation": {
// //             "first_name": "John",
// //             "last_name": "Doe",
// //             "date_of_birth": "1988-04-04"
// //    }
// }, // the data you’re sending
// {
//     headers: {
//         Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`, // 👈 your API key here
//         "Content-Type": "application/json",
//     },
// }
// );
//  console.log(response)
// //  return response

// } catch (error) {
//     console.log(error.message);
    
// }
 
// }
// test().then((data)=> {
//     console.log(data)
// })



app.use('/', (req, res) => {
  res.send('Connected to Backend Server')
});
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
    console.log(`Server is running on PORT: ${PORT} yeahhhhh boiii`);
    
})