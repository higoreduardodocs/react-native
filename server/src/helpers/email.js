export const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: 'gmail',
    auth: {
      user: 'higoreduardodocs@gmail.com',
      pass: 'wkkjjprzkqxtboju',
    },
  })

  const mailOptions = {
    from: 'amazon.com',
    to: email,
    subject: 'Email de verificação',
    text: `Clique no link a seguir para verificar seu e-mail: http://localhost:8000/auth/verify/${verificationToken}`,
  }
  await transporter.sendMail(mailOptions)
}
