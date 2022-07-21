const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const routes = require('./settings/routes')

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    crossDomain: true
}));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

routes(app)

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})