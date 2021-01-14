const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes/api')

const app = express();
const PORT = process.env.PORT || 5000;

const localURI = 'mongodb://localhost/mern_blog'


// connect DB
mongoose.connect(process.env.MONGODB_URI || localURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

// Checking Successful DB connection
mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected!!!')
})

app.use(express.json());//to render json data received from req call
app.use(express.urlencoded({ extended: false })); // to render urls 

//HTTP request logger
app.use(morgan('tiny'));

app.use('/api',routes)

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('clientside/build'))
}


app.listen(PORT, console.log(`Server on at Port ${PORT}`));