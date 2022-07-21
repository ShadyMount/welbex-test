const express = require('express')
const app = express()
const port = 3001
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})