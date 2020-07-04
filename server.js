const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const path = require('path');

const app = express();

// Bodyparser Middleware

app.use(express.json());

// DB Config 
const db = config.get('mongoURI');

//connect to moongodb
mongoose
    .set('useCreateIndex',true)
    .connect(db,{useUnifiedTopology: true , useNewUrlParser: true})
    .then(()=>console.log('MongoDB connected'))
    .catch(err=> console.log(err));
    
app.set('port', process.env.PORT || 5000);

//const P0RT = process.env.P0RT || 5000;

//use routes
app.use('/api/items/', require('./routes/api/items'));
app.use('/api/users/', require('./routes/api/users'));
app.use('/api/auth/', require('./routes/api/auth'));

// serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

app.listen(app.get('port'), ()=> console.log(`Server started on port ${app.get('port')}`))