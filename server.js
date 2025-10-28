require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 1234
const cors = require('cors')
const axios = require('axios')
const sequelize = require('./Database/database')
const userRouter = require('./route/userRouter')
const businessRouter = require('./route/businessRouter')
const paymentRouter = require('./route/paymentRouter')
const investorRouter = require ('./route/investorRouter')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi  = require('swagger-ui-express')


const app = express()
app.use(express.json())
app.use(cors())


// app.use('/', (req, res) => {
//   res.send('Connected to Backend Server')
// });

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Api documentation for mini project',
    version: '4.1.9',
    description:
    'first swagger documentation class',
    // license: {
      //   name: 'Licensed Under MIT',
      //   url: 'https://spdx.org/licenses/MIT.html',//whatever
    // },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://google.com',//frontend link
    },
  },
  servers: [
    {
      url: 'https://trustforge.onrender.com',
      description: 'production server',
    },
    {
      url: 'http://localhost:4309',
      description: 'Development server',
    }
  ],
  components:{
    securitySchemes:{
      bearerAuth:{
        type:"http",
        scheme:"bearer",
        bearerFormat:"JWT",// optional but recomended
        description:"Enter your jwt token in the format **Bearer &lt;token&gt;**",
      }
    }
  },
  security:[
    {
      bearerAuth:[],
    }
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./route/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(userRouter);
app.use(businessRouter);
app.use(investorRouter);
app.use(paymentRouter);
app.use((error, req, res, next)=>{
  if (error) {
    res.send(error.message)
  }
  next()
})
const Startserver = async ()=>{ 
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT: ${PORT}`);
        
    })
    } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    }
}

Startserver();
