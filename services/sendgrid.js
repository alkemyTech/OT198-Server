const sgMail = require('@sendgrid/mail')

const sendWelcomeEmail = async (email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: 'Welcome to the App',
    text: 'Welcome to the App',
  }
  await sgMail.send(msg)
}

module.exports = {
  sendWelcomeEmail,
}
