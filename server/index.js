const express = require('express');
const {connect} = require('mongoose');
const cors = require('cors');
const upload = require('express-fileupload');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors({credentials:true, origin: '*'}));
app.use(upload());
app.use('/uploads',express.static(__dirname + '/uploads'));

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const {notFound,errorHandler} = require('./middlewares/errorMiddlewares.js');

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT||8080,()=>{
        console.log("Server running on port "+process.env.PORT);
    });
}).catch((err)=>{
    console.log(err);
});

app.get('/',(req,res)=>{
    res.send
    ('Server is running');
}
);
