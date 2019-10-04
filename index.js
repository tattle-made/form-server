const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3002
const RequestAccess = require('./schema/request-access')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('hi'))

app.post('/request-access/add', (req,res) => {
    console.log(req.body)
    const keys = Object.keys(req.body)
    if(keys.indexOf('name')==-1 || keys.indexOf('emailAddress')==-1){
        res.status(400).json({'message' : 'bad request'})
    }else{
        const newRequestAccess = new RequestAccess.RequestAccessItem(req.body)
        newRequestAccess.save().then((item) => res.send(item))
    }
})

app.get('/request-access/get-all', (req,res)=>{
    RequestAccess.RequestAccessItem.find({})
    .then((items)=>res.send(items))
    .catch((err)=>console.log(err));
})

app.post('/request-access/delete-by-id', (req,res)=>{
    RequestAccess.RequestAccessItem.deleteOne({_id:req.body.id})
    .then((deleted)=>res.send(deleted))
    .catch((err)=>console.log(err));
})

app.post('/request-access/delete-all', (req,res)=>{
    RequestAccess.RequestAccessItem.deleteMany({})
    .then((deleted)=>res.send(deleted))
    .catch((err)=>console.log(err));
})

mongoose.connect(
    'mongodb://mongo:27017/test', 
    {useNewUrlParser: true}
)
.then(()=>console.log('mongoose connected'))
.catch((err)=>console.log('error connecting to mongoose ',err))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))