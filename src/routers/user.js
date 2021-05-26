const router = require('express').Router()
const Area = require('../models/area')
const path = require('path')
const { generateOTP, confirmOTP } = require('../authorization/authorize')
const validator = require('validator')

router.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/client.html'))
})

router.post('', async (req, res) => {
    try {
        const data = await Area.findOne({ pincode: req.body.pincode })

        if (!data) {
            await new Area({ pincode: req.body.pincode, email: [req.body.email], notificationTime: new Date().getTime() }).save()
        } else {
            data.email = data.email.concat(req.body.email)
            await data.save()
        }
        res.status(200).sendFile(path.join(__dirname, '../../public/client.html'))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin.html'))
})

router.get('/admin/authorize', (req, res) => {
    if (req.query.mobile) {
        if (req.query.email === process.env.ADMIN_EMAIL) {
            if (validator.isMobilePhone(req.query.mobile)) {
                generateOTP(req.query.mobile).then((result) => {
                    return res.send({ signal: 'Enable' })
                }).catch((error) => {
                    if (error === 'OTP Already Sent') {
                        return res.send({ signal: 'Enable-Alert' })
                    }
                    return res.send({ signal: error })
                })
            } else {
                return res.send({ signal: 'Invalid Mobile' })
            }
        } else {
            return res.send({ signal: 'UnAuthorized' })
        }
    } else if (req.query.otp) {
        confirmOTP(req.query.otp).then((result) => {
            return res.send({ signal: result })
        }).catch((error) => {
            return res.send({ signal: error })
        })
    }
})

module.exports = router