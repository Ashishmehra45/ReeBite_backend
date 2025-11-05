const app = require('./src/app')
const connnectDB = require('./src/db/db')

   
connnectDB()

app.listen(3000,()=>{
    console.log('server is runnig 3000')
})