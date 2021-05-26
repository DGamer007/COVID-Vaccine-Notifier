const request = require('request')
const crypto = require('crypto-js')
let token = ''
let txnId = ''

const generateOTP = async (mobile) => {
    const getOtp = {
        url: 'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',
        json: true,
        body: {
            mobile
        }
    }

    return new Promise((resolve, reject) => {
        request.post(getOtp, (error, response) => {
            if (error) {
                reject(error.errno)
            } else if (response.statusCode != 200) {
                reject(response.body)
            } else {
                txnId = response.body.txnId
                resolve('Success')
            }
        })
    })
}

const confirmOTP = async (otp) => {
    const setOtp = {
        url: 'https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
        json: true,
        body: {
            "otp": crypto.SHA256(otp).toString(),
            txnId
        }
    }

    return new Promise((resolve, reject) => {
        request.post(setOtp, (error, response) => {
            if (error) {
                reject(error.errno)
            } else if (response.statusCode != 200) {
                reject(response.body)
            } else {
                token = response.body.token
                resolve('Success')
            }
        })
    })
}

module.exports = { generateOTP, confirmOTP }