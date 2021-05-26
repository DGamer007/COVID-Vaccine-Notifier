const sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = (data, emailIds) => {

    let text = ''

    data.forEach((center) => {
        text += `Center Name: ${center.name}\nVaccine Name: ${center.vaccine}\nCenter Address: ${center.address}\nMinimum Age Limit: ${center.min_age}\nFees: ${center.fee}\nAvailable Capacity: ${center.total}\nAvailable Capacity Dose 1: ${center.dose1}\nAvailable Capacity Dose 2: ${center.dose2}\nSlots: ${center.slots}\n\n\n`
    })

    emailIds.forEach((email) => {
        sendGrid.send({
            to: email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            Subject: 'Vaccine Notification',
            text
        })
    })
}

module.exports = sendMail