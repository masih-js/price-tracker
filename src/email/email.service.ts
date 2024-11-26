import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend } from 'mailersend';

@Injectable()
export class EmailService {
  private mailerSend: MailerSend;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY, // Add your API key to the .env file
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const emailParams = new EmailParams()
      .setFrom({
        email: 'MS_2Blr8r@trial-3z0vklo12ypg7qrx.mlsender.net',
        name: 'price-tracker',
      })
      .setTo([{ email: to, name: '' }]) // Name can be an empty string if not required
      .setSubject(subject)
      .setText(text);

    try {
      await this.mailerSend.email.send(emailParams);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(
        'Error sending email:',
        error.response?.data || error.message,
      );
    }
  }
}
