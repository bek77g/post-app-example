import nodemailer from 'nodemailer';

export const sendMailService = async (emailToSend, content) => {
  const transporter = nodemailer.createTransport({
    service: 'your_email',
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password',
    },
  });

  const mailOptions = {
    from: 'your_email@example.com',
    to: emailToSend,
    subject: 'Сброс пароля',
    text: content,
  };

  await transporter.sendMail(mailOptions);
};
