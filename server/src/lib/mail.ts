import nodemailer from "nodemailer";

interface ISendMailTo {
  name: string;
  address: string;
}

interface ISendMail {
  to: ISendMailTo;
  subject: string;
  html: string;
}

async function getMailClient() {
  const account = await nodemailer.createTestAccount();
  const transport = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  return transport;
}

export async function sendMail({
  to: { name, address },
  subject,
  html,
}: ISendMail) {
  const mail = await getMailClient();

  const message = await mail.sendMail({
    from: {
      name: "Equipe plann.er",
      address: "oi@plann.er",
    },
    to: {
      name: name,
      address: address,
    },
    subject: subject,
    html: html,
  });

  console.log(nodemailer.getTestMessageUrl(message));
}
