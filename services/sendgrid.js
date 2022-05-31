const sgMail = require('@sendgrid/mail')
const { templateEmail } = require('../templates/welcomeEmail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = async (email) => {
  try {
    const msg = templateEmail(email, process.env.SENDGRID_EMAIL)
    await sgMail.send(msg)
  } catch (error) {
    throw new Error(error)
  }
}
module.exports = {
  sendWelcomeEmail,
}
