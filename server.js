require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./Database/database');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const userRouter = require('./route/userRouter');
const businessRouter = require('./route/businessRouter');
const paymentRouter = require('./route/paymentRouter');
const investorRouter = require('./route/investorRouter');
const meetingRouter = require('./route/meetingRouter');
const kycRouter = require('./route/kycRoute');

const app = express();
const PORT = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());


// app.get('/', (req, res) => {
//   res.send('✅ TrustForge backend connected successfully');
// });

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation for TrustForge',
    version: '4.1.9',
    description: 'Swagger documentation for the TrustForge backend',
    contact: {
      name: 'TrustForge Support',
      url: 'https://google.com',
    },
  },
  servers: [
    {
      url: 'https://trustforge.onrender.com',
      description: 'Production server',
    },
    {
      url: 'http://localhost:4309',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token as **Bearer <token>**',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./route/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(userRouter);
app.use(businessRouter);
app.use(investorRouter);
app.use(paymentRouter);
app.use(meetingRouter);
app.use(kycRouter);

app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  res.status(500).json({ message: 'Internal Server Error', error: error.message });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    app.listen(PORT, () => {
      console.log(` Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
};

startServer();
