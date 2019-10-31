const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (term) => {
  const msg = {
    to: process.env.RECIEVER_EMAIL,
    from: 'submission@urbanricktionary.com',
    subject: `New Submission - ${term.word}`,
    text: JSON.stringify(term),
    html: `
      <div>
        <strong>Term:</strong> ${term.word}
      </div>

      <div>
        <strong>Definition:</strong> ${term.definition}
      </div>

      <div>
        <strong>Example:</strong> ${term.example}
      </div>
    `,
  };
  
  mail.send(msg);
};
