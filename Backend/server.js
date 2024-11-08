const express = require('express')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const { MongoClient } = require ('mongodb');
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passman';


const app = express()
const port = process.env.PORT || 3000
app.use(bodyparser.json())
app.use(cors({
  origin: '*',
}));

client.connect();

app.get('/', async(req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true , result: findResult })
})

app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true , result: findResult })
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
