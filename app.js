const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exerciseRouter = require('./routes/exercise-route');
const userRouter = require('./routes/user-route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/exercises',exerciseRouter);
app.use('/users',userRouter);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@eventsdatacluster-si5ri.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(()=>
{
    app.listen(3001);
    console.log("we are connected");
    
}).catch(
    err =>{console.log(err);
    }
);