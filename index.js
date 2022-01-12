const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const {MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER} = require('./config/config')


console.log(MONGO_USER)
const app = express()

app.enable('trust proxy')
app.use(cors({}))

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authsource=admin`


const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('success connected mongo')
        })
        .catch((err) => {
            console.log(err)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry()

app.get('/', (req, res) => {
    res.send('<h2>Hello you !</h2>')
    console.log('hello you')
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('listening on port ' + port))