import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, EMAIL_USER } from './env.js';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendGridClient = sgMail;
export const SENDER_EMAIL = EMAIL_USER;

