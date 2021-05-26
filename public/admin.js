const genOtpButton = document.querySelector('#genOTP')
const mobileInput = document.querySelector('#mobile')
const registerButton = document.querySelector('#Register')
const otpInput = document.querySelector('#otp')
const emailInput = document.querySelector('#email')

emailInput.style.display = "inline-block"
registerButton.style.display = "none"
otpInput.style.display = "none"
genOtpButton.style.display = "inline-block"
mobileInput.style.display = "inline-block"

genOtpButton.addEventListener('click', (event) => {
    event.preventDefault()
    fetch(`/admin/authorize?mobile=${mobileInput.value}&email=${emailInput.value}`).then((res) => {
        res.json().then((data) => {
            if (data.signal === 'Enable') {
                genOtpButton.style.display = "none"
                mobileInput.style.display = "none"
                emailInput.style.display = "none"
                registerButton.style.display = "inline-block"
                otpInput.style.display = "inline-block"
            } else if (data.signal === 'Enable-Alert') {
                alert('OTP Already sent...')
                genOtpButton.style.display = "none"
                mobileInput.style.display = "none"
                emailInput.style.display = "none"
                registerButton.style.display = "inline-block"
                otpInput.style.display = "inline-block"
            } else if (data.signal === 'Invalid Mobile') {
                alert('Please Provide valid Number...')
            } else if (data.signal === 'UnAuthorized') {
                alert(`${emailInput.value} is not Admin Email...`)
            } else if (data.signal === -3008) {
                alert('Connection failure...Please check your internet connectivity and try again...')
            }
            else {
                alert(`Error: ${data.signal}`)
            }
        })
    })
})

registerButton.addEventListener('click', (event) => {
    event.preventDefault()
    fetch(`/admin/authorize?otp=${otpInput.value}`).then((res) => {
        res.json().then((data) => {
            if (data.signal === 'Success') {
                alert('Authorization Complete...Now you\'ll be able to request from this IP-ADDRESS')
            } else {
                alert(`Error: ${data.signal}`)
            }
        })
    })
})