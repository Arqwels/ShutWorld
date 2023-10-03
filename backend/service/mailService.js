const nodemailer = require('nodemailer');

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendActivationMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта на сайте ' + process.env.API_URL,
        text: 'Пожалуйста, активируйте ваш аккаунт, перейдя по ссылке: ' + link
      });
    } catch (error) {
      console.error('Ошибка отправки письма:', error);
    }
  }
}

module.exports = new MailService();
