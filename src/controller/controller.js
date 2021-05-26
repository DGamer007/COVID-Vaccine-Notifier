const request = require('request-promise')
const Area = require('../models/area')
const sendMail = require('../notification/email')
let counter = 1

const callIt = async () => {
    const date = new Date()
    const areas = await Area.find({})

    if (areas.length === 0) {
        callIt()
    } else {

        let i = 0
        const Timer = setInterval(async () => {
            const findByPin = {
                url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${areas[i++].pincode}&date=${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
                json: true
            }

            try {
                const rawData = await request.get(findByPin)
                let flag = false
                const mailData = []
                console.log(counter++)
                if (new Date().getTime() - areas[i - 1].notificationTime >= 300000) {

                    areas[i - 1].updateTime()

                    rawData.sessions.forEach((center) => {
                        if (center.available_capacity > 0) {

                            flag = true

                            mailData.push({
                                name: center.name,
                                vaccine: center.vaccine,
                                address: center.address,
                                min_age: center.min_age_limit,
                                time: `${center.from} to ${center.to}`,
                                fee: center.fee,
                                total: center.available_capacity,
                                slots: center.slots,
                                dose1: center.available_capacity_dose1,
                                dose2: center.available_capacity_dose2,
                            })
                        }
                    })

                    if (flag) {
                        sendMail(mailData, areas[i - 1].email)
                    }
                }

            } catch (error) {
                console.log(error.statusCode)
            }

            if (i === areas.length) {
                clearInterval(Timer)
                callIt()
            }
        }, 5000)
    }
}

module.exports = callIt