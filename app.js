const express= require('express')
const app = express();
const userRoutes = require('./routes/user');

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({extended: true,})); //Parse URL-encoded bodies

//ROUTES 
app.use('/user' ,userRoutes);

// iF THERE IS ERROR IN BACKEND SERVER

 app.use( (req, res,next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
  })

  app.use((error,req, res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
        message: error.message
        }
    })
    })

module.exports = app; 