const express = require('express')
require('./database/mongoose')
const userRouter = require('./routers/user')
const callIt = require('./controller/controller')
const path = require('path')

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(userRouter)
app.use('/static', express.static(path.join(__dirname, '../public')))

app.listen(port, () => {
    console.log("Server is up and running on PORT:" + port)
    callIt()
})