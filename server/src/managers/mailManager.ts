import { Response } from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';

import { extendedRequest } from '../../types/extendedTypes';

export default class MailManager {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER_HOST,
      port: Number(process.env.MAIL_SERVER_PORT),
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    this.sendMail = this.sendMail.bind(this);
  }

  async sendMail(req: extendedRequest | any, res: Response): Promise<void> {
    const user = req.user;

    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }

    if (typeof req.body.message === 'string') {
      const message = `
            <div style="font-family: Arial, sans-serif;">
                <h1 style="text-align: center;">BUG Report</h1>
                <h2>Report Details</h2>
                <p><strong>Reported by:</strong> ${user.user?.staffid || user.user.regno}</p>
                <p><strong>Reported at:</strong> ${new Date().toUTCString()}</p>
                <h2>Message</h2>
                <p>${req.body.message}</p>
            </div>
            `;

      const mailOptions: nodemailer.SendMailOptions = {
        from: `"AssetHub - BUG Report" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER,
        subject: 'BUG Report',
        html: message,
        attachments: req.files.map((file: Express.Multer.File) => ({
          filename: file.originalname,
          path: file.path,
        })),
      };

      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send({ error: 'Internal server error' });
          return;
        }
        res.status(200).send();
      });
    } else {
      res.status(400).send({ error: 'Invalid input' });
    }

    req.files.forEach((file: Express.Multer.File) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
}
