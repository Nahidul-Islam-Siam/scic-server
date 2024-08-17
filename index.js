const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 9000

const app = express()

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174','https://scic-server-kappa.vercel.app'],
    Credential: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Hello from Bangladesh.....')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oj7uysy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {

      const dataCollection = client.db('scic-assignment').collection('productsData')
     
      
      app.get('/products', async (req,res)=>{
        const result = await dataCollection.find().toArray()
        res.send(result)
      })


      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    
    }
  }
  run().catch(console.dir);


app.listen(port, ()=> console.log(`Server Running on port ${port}`)
)