const nodemailer = require("nodemailer");
const { log } = require("./log.js");

const Config = require("./config.js");
const config = new Config();

const newTransporter = async () => {

    let emailAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        sendmail: true,
        path: '/usr/sbin/sendmail',
        // host: emailAccount.smtp.host,
        // port: emailAccount.smtp.port,
        // secure: emailAccount.smtp.secure,
        // auth: {
        //     user: emailAccount.user, // generated ethereal user
        //     pass: emailAccount.pass, // generated ethereal password
        // },
        port: 25,
        host: 'localhost',
        tls: {
            rejectUnauthorized: false
        },
    });

    return transporter;
}

const sendEmail = async (subject, text) => {

    const to = config.security.emailAddress;
    const from = `DockerMan <dockerman@${config.domain.domainName}>`;

    console.log(`Sending email "${subject}" to ${to}.`);

    let transporter = await newTransporter();

    let email = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    }, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log(info.envelope);
        console.log(info.messageId);
    })


    return email;
}
 
const incorrectLogin = async (ip) => {

    config.sync();
    const subject = `Incorrect Login Attempt`;
    const text  = `An incorrect login attempt was made to DockerMan@${config.domain.domainName} from IP ${ip}`;

    log(text);
    sendEmail(subject, text);
}

const correctLogin = async (ip) => {
    
    config.sync();
    const subject = `Successfully Logged In`;
    const text  = `A user with DockerMan@${config.domain.domainName} from IP ${ip}`;

    log(text);
    sendEmail(subject, text);
}

module.exports = { incorrectLogin, correctLogin };