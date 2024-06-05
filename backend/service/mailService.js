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
        from: '"ShutWorld" <notifications@shutworld.ru>',
        to,
        subject: 'Активация аккаунта на сайте ' + process.env.PROJECT_NAME,
        html: `
          <!DOCTYPE html>
          <html lang="RU">
          <head>
            <meta charset="UTF-8">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&display=swap" rel="stylesheet">
            <style>
              html {
                box-sizing: border-box;
              }
              *, *:after, *:before {
                box-sizing: inherit;
              }
              .ubuntu-regular {
                font-family: "Ubuntu", sans-serif;
                font-weight: 400;
                font-style: normal;
              }
              .ubuntu-medium {
                font-family: "Ubuntu", sans-serif;
                font-weight: 500;
                font-style: normal;
              }
              body {
                font-family: "Ubuntu", sans-serif;
                margin: 0;
                padding: 0;
              }
              a {
                text-decoration: none;
                color: inherit;
              }
              ul {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              h1, h2, h3, p, figure, fieldset {
                margin: 0;
              }
              .message {
                font-size: 18px;
                padding: 30px 25px;
                border: 1px solid rgba(0, 0, 0, 0.25);
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
              }
              a:hover {
                background-color: #5A2EEA;
              }
            </style>
          </head>
          <body>
            <div class="wrapper" style="text-align: center;">
              <img src="https://64.media.tumblr.com/9cd7b21da7f1e782964a52074eb24882/805e50452ab17b32-f6/s250x400/ff054546c65e7a9e3d5d23bbfc3acdb3e28318ba.pnj" width="160" height="160">
              <h1 style="font-size: 36px; font-weight: 500;">Подтверждение почты</h1>
              <div class="message" style="max-width: 548px; margin: 30px auto 0; text-align: left;">
                <h2 style="font-size: 18px; font-weight: 400;">Подтвердите адрес электронной почты</h2>
                <p style="font-size: 16px; opacity: 0.75; margin-top: 30px;">Этот адрес электронной почты был указан на сайте ShutWorld для возможности восстановления пароля в случае его утери. Пожалуйста, нажмите кнопку 'Подтвердить почту', чтобы мы могли отправить вам код для восстановления пароля в будущем.</p>
                <div style="text-align: center;">
                  <a href='${link}' style="display: inline-block; padding: 15px 25px; margin-top: 30px; background-color: #6736E2; color: #FFF; font-size: 18px; text-decoration: none; border-radius: 5px; border: 2px solid #6736E2; transition: background-color 0.3s ease; ">Подтвердить почту</a>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      });
    } catch (error) {
      console.error('Ошибка отправки письма:', error);
    }
  }
}

module.exports = new MailService();
