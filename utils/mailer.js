const nodemailer = require("nodemailer");

// Update the mailer function
const mailer = async (otp, mailTo) => {
  // Create a transporter with username and password authentication
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "praneshcse2k25@gmail.com", // Your Gmail email address
      pass: "iufn hmpr bnve kerm",     // Your Gmail App Password
    },
  });

  // Email content
  let mailOptions = {
    from: "Iot Smart City <praneshcse2k25@gmail.com>", // Your email address and display name
    to: mailTo, // Recipient email
    subject: "Iot Smart City Account Verification", // Email subject
    html: `
      <h1 style="text-align: center;">Iot Smart City</h1>
      <div style="font-size: 18px;">
          <span style="margin-left:20%">Kindly use this code:</span> 
          <b style="color: green;">${otp}</b>
      </div>
      <p style="margin: 1% 20%;">Thanks, <br>
          Smart City Team</p>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = mailer;
