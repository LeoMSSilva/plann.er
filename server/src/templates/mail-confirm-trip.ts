interface ITemplate {
  participantName: string;
  destination: string;
  formattedStartDate: string;
  formattedEndDate: string;
  confirmationLink: string;
}

export const mailConfirmTrip = ({
  participantName,
  destination,
  formattedStartDate,
  formattedEndDate,
  confirmationLink,
}: ITemplate) =>
  `
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="height: 100vh; width: 100%; margin: 0; padding: 0; text-align: center; font-family: sans-serif; font-size: 16px; line-height: 1.6; background-color: #09090b; color: #52525b; ">
    <div style="display: inline-block; width: 64%; margin: 100px auto">
      <h1>Olá,
        <strong style="color: #a1a1aa">${participantName}!</strong>
      </h1>
      <p style="font-size: 18px">Você foi convidado(a) para participar de uma viagem para
        <strong style="color: #a1a1aa">${destination}</strong> nas datas de
        <strong style="color: #a1a1aa">${formattedStartDate}</strong> até
        <strong style="color: #a1a1aa">${formattedEndDate}</strong>.
      </p>
      <p style="font-size: 18px">
        Para confirmar sua presença, clique no link abaixo:
      </p>
      <br>
      <p>
        <a style="color: #1a2e05; text-decoration: none; background-color: #bef264; padding: 16px 32px; border-radius: 8px" href=${confirmationLink}>
          Confirmar presença
        </a>
      </p>
      <br>
      <br>
      <br>
      <br>
      <br>
      <p style="font-size: 14px">
        Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.
      </p>
    </div>
  </body>
</html>
`.trim();
