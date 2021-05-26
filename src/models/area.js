const mongoose = require('mongoose')

const areaSchema = mongoose.Schema({
    email: [
        {
            type: String,
            unique: true,
            required: true,
            trim: true
        }
    ],
    pincode: {
        type: Number,
        required: true,
        trim: true
    },
    notificationTime: {
        type: Number
    }
}, {
    timestamps: true
})

areaSchema.methods.updateTime = async function () {
    this.notificationTime = new Date().getTime()
    await this.save()
}

const Area = mongoose.model('Area', areaSchema)

module.exports = Area