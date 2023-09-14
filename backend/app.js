const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/routes/index')
app.use(express.json())
const { sequelize } = require('./models')
app.use(cors())
app.use(routes)

app.listen(3333, async() => {
    await sequelize.authenticate()
    console.log('app listening on port 3333')
})