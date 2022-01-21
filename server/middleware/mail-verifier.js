const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, activationCode) {
    try {
      await this.transporter.sendMail({
        from: 'testsendvolyntseva@gmail.com',
        to,
        subject: "Активация аккаунта на" + process.env.API_URL,
        text: "",
        html: `
              <div>
              <h1>Код активации:</h1>
              <h2>${activationCode}</h2>
              </div>
              `,
      });
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = new MailService();
