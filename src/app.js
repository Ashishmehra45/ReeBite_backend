const express = require('express')
const app = express()
const authroutes = require('./routes/auth.route')
const foodroutes = require('./routes/food.route')
const foodpartnerRoutes = require('./routes/food-partner.routes')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const cors = require('cors')
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/api/auth',authroutes)
app.use('/api/food',foodroutes)
  app.use('/api/food-partner',foodpartnerRoutes)


module.exports = app