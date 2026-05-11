const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "ridaya100@gmail.com",
    pass: "bisjyuhrrezkjqnd"
,
  },
});

let mailverification = async (token, email)=>{
    try {
  const info = await transporter.sendMail({
    from: 'ridaya100@gmail.com', 
    to: email,
    subject: "Please verify your email", 
    html: `<body style=margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif><table border=0 cellpadding=0 cellspacing=0 style="background-color:#f4f6f8;padding:20px 0"width=100%><tr><td align=center><table border=0 cellpadding=0 cellspacing=0 style=background:#fff;border-radius:8px;overflow:hidden width=600><tr><td style=background-color:#16a34a;padding:20px align=center><h1 style=color:#fff;margin:0;font-size:24px>EcoBazar 🌱</h1><tr><td style=padding:30px;color:#333;text-align:center><h2 style=margin-top:0>Verify Your Email Address</h2><p style=font-size:16px;line-height:1.6>Hello,<p style=font-size:16px;line-height:1.6>Thank you for signing up with <strong>EcoBazar</strong>. Please confirm your email address by clicking the button below.<table border=0 cellpadding=0 cellspacing=0 style="margin:25px 0"align=center><tr><td style=border-radius:5px align=center bgcolor=#16a34a><a href="http://localhost:5173/verifyemail/${token}" style="display:inline-block;padding:12px 28px;font-size:16px;color:#fff;text-decoration:none;font-weight:700"target=_blank>Verify Email</a></table><p style=font-size:14px;color:#555>If the button doesn’t work, copy and paste the link below:<p style=word-break:break-all;color:#16a34a;font-size:14px>"http://localhost:5173/verifyemail/${token}"<p style=font-size:14px;color:#777;margin-top:20px>If you did not create an account, you can safely ignore this email.<tr><td style="border-top:1px solid #eee"><tr><td style=padding:20px;font-size:12px;color:#999 align=center>© 2026 EcoBazar. All rights reserved.<br>Dhaka, Bangladesh</table></table>`, 
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}


let resetPasswordMail = async (token, email)=>{
    try {
  const info = await transporter.sendMail({
    from: 'ridaya100@gmail.com', 
    to: email,
    subject: "Please Reset your password", 
    html: `<body style=margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif><table border=0 cellpadding=0 cellspacing=0 bgcolor=#f4f6f8 width=100%><tr><td style="padding:40px 20px"align=center><table border=0 cellpadding=0 cellspacing=0 bgcolor=#ffffff width=600 style=border-radius:10px;overflow:hidden><tr><td style=padding:30px align=center bgcolor=#00B207><h1 style=color:#fff;margin:0;font-size:28px>EcoBazar</h1><tr><td style="padding:40px 30px;color:#333"><h2 style=margin-top:0;color:#222>Reset Your Password</h2><p style=font-size:16px;line-height:26px>Hello <strong>{{user_name}}</strong>,<p style=font-size:16px;line-height:26px>We received a request to reset your EcoBazar account password. Click the button below to create a new password.<table border=0 cellpadding=0 cellspacing=0 style="margin:30px auto"align=center><tr><td style=border-radius:6px align=center bgcolor=#00B207><a href="http://localhost:5173/resetpassword/${token}" style="display:inline-block;padding:14px 30px;font-size:16px;color:#fff;text-decoration:none;font-weight:700"target=_blank>Reset Password</a></table><p style=font-size:14px;line-height:24px;color:#666>If the button above doesn’t work, copy and paste the following link into your browser:<p style=word-break:break-all;font-size:14px;color:#00b207>http://localhost:5173/resetpassword/${token}<p style=font-size:16px;line-height:26px>This password reset link will expire in <strong>30 minutes</strong>.<p style=font-size:16px;line-height:26px>If you didn’t request a password reset, you can safely ignore this email.<p style=font-size:16px;line-height:26px;margin-bottom:0>Thanks,<br><strong>EcoBazar Team</strong><tr><td style=padding:20px;font-size:13px;color:#777 align=center bgcolor=#f0f0f0>© 2026 EcoBazar. All rights reserved.</table></table>`, 
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

module.exports = { mailverification , resetPasswordMail}