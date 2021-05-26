const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_PRODUCTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})