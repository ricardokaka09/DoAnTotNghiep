import * as sgMail from '@sendgrid/mail';
interface SendEmail {
  mail: {
    to: string;
    html: string;
    subject: string;
    text: string;
  };
}
export class SendGrid {
  senderDefault: string;
  constructor(apiKey, senderDefault) {
    this.senderDefault = senderDefault;
    sgMail.setApiKey(apiKey);
  }
  async sendMailSDK({ mail }: SendEmail) {
    try {
      const mailSend = Object.assign({ from: this.senderDefault, ...mail });
      const send = await sgMail.send(mailSend);
      return send;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
