require('dotenv').config()
const {NODEMAILER_USER, NODEMAILER_PASS} = process.env
const nodemailer = require('nodemailer');
const registerTempate = require('../htmlTemplates/registerTemplate');
const forgotPassword = require('../htmlTemplates/forgotPasswordTemplate');

const createTrans = ()=>{
    const transport = nodemailer.createTransport({
        service: "gmail",
        // port: 2525,
        auth: {
            user: NODEMAILER_USER,
            pass: NODEMAILER_PASS
        }
        // host: "sandbox.smtp.mailtrap.io",
        // port: 2525,
        // auth: {
        //     user: "aeadd7eb9ea923",
        //     pass: "b24b8c868ade61"
        // }
    })
    return transport;
}

const sendMail = async ({from, to, subject, html})=>{
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from:from,
        to:to,
        subject:subject,
        html:html,
        // attachment:[
        //     {
        //         filename:'text1.txt',
        //         content:'Hello world'
        //     },
        //     ...
        //     {
        //         filename:'textn.txt',
        //         content:'Hello world'
        //     }
        // ]
    })

    console.log('Message send: %s', info.messageId)

    return
}

module.exports = {sendMail}