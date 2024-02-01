import { envs } from './envs.adapter';
import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport(
    {
      host: envs.EMAIL_HOST,
      port: envs.EMAIL_PORT,
      auth: {
        user: envs.EMAIL_USER,
        pass: envs.EMAIL_PASS
      }
    }
  );