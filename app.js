const express = require('express');
const app = express();
const router = require('./routers/router');
const {
  servicePort
} = require('./config/config.json');
const sequelize = require('./models/database');
const errorHandler = require('./middlewares/errorHandler');
const authorization = require('./middlewares/authorization');
const bodyParser = require('body-parser');


// Initialize and sync the Sequelize instance
sequelize.sync()
  .then(() => {
    console.log('Database and tables are synchronized.');
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });


// Middleware for parsing JSON
app.use(bodyParser.json());
app.use(authorization);
app.use(express.json());
//Router

app.use('/api', router);
app.use(errorHandler());

//Startup
app.listen (servicePort, ()=>{
  console.log(`App listening on port ${servicePort}`);
})

module.exports = app;   