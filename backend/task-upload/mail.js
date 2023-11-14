const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using Ethereal SMTP
async function sendMail() {
  try {
    // Create a test account with Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Create a Nodemailer transporter using the test account
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Email options
    const mailOptions = {
      from: 'hausverwaltung@otfm.at',
      to: 'ki.hausverwaltung@yandex.ru',
      subject: 'test',
      text: 'hellomail',
      html: '',
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

// Call the sendMail function
sendMail();
