const config = require('../config/config');
// const db = require('../models');
const nodemailer = require('nodemailer');

class EmailSenderComponent {
    constructor() {
        nodemailer.createTestAccount( (err, account) => {
            this.transporter = nodemailer.createTransport({
                host: "gmail.com",
                port: 587,
                secure: "",
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
        });
    }
    sendReset(options, callback) {
        let resetPassEmailForm = {
            from: '"RDclone 👻" <foo@example.com>', // sender address
            to: options.user.email, // list of receivers
            subject: 'Password reset request✔', // Subject line
            text: 'Click here to reset password', // plain text body
            html: 'http://localhost:' + config.process.ENV.PORT + '/resetpassword/:' + options.token // html body
        };
        
        this.sendEmail(resetPassEmailForm,(error,info)=>{
            if (error){
                return callback(error);
            }
            return callback(null, info);
        });   
    }
    /**
     * 
     * @param {Object} options an object with options
     * @returns {Promise}
     */
    sendResetPromise(options) {
        return new Promise((resolve,reject)=>{
            let resetPassEmailForm = {
                from: '"RDclone 👻" <foo@example.com>', // sender address
                to: options.user.email, // list of receivers
                subject: 'Password reset request✔', // Subject line
                text: 'Click here to reset password', // plain text body
                html: 'http://localhost:' + config.process.ENV.PORT + '/resetpassword/:' + options.token // html body
            };
            
            this.exemplePromise(resetPassEmailForm)
                .then((info)=>{
                    return resolve(info);
                })
                .catch((err)=>{
                    return reject(err)
                });
        });
    }
    resetConfirm(options, callback) {
            let passwordUpdateEmailForm = {
                    from: '"RDclone 👻" <foo@example.com>', // sender address
                    to: options.user.email, // list of receivers
                    subject: 'Password update confirmation ✔', // Subject line
                    text: 'Hello ' + options.user.username + '. Your password has been successfuly updated', // plain text body
                    html: '<b>Hello world?</b>' // html body
                };
            
            this.sendEmail(passwordUpdateEmailForm,(error,info)=>{
                if (error){
                    return callback(error);
                }
                return callback(null, info);
            })
        }
    sendEmail(template, callback){
        this.transporter.sendMail(template, (error, info) => {
            if (error) {
                return callback(error)
            }
            console.log('Message sent: %s', info.messageId);
            return callback(null, info);
        });
    }
    exemplePromise(template){
        return new Promise((resolve,reject)=>{
            this.transporter.sendMail(template, (error, info) => {
                if (error) {
                    return reject(error)
                }
                console.log('Message sent: %s', info.messageId);
                return resolve(info);
            });
        });        
    }
}

// function EmailSenderComponent(){
//     nodemailer.createTestAccount( (err, account) => {
//         EmailSenderComponent.transporter = nodemailer.createTransport({
//             host: "gmail.com",
//             port: 587,
//             secure: "",
//             auth: {
//                 user: account.user,
//                 pass: account.pass
//             }
//         });
//     });
// };

// EmailSenderComponent.prototype.sendReset = (options, callback) => {
//     let resetPassEmailForm = {
//         from: '"RDclone 👻" <foo@example.com>', // sender address
//         to: options.user.email, // list of receivers
//         subject: 'Password reset request✔', // Subject line
//         text: 'Click here to reset password', // plain text body
//         html: 'http://localhost:' + config.process.ENV.PORT + '/resetpassword/:' + options.token // html body
//     };
    
//     EmailSenderComponent.transporter.sendMail(resetPassEmailForm, (error, info) => {
//         if (error) {
//             return callback(error)
//         }
//         console.log('Message sent: %s', info.messageId);
//         return callback(null, info);
//     });
// };

// EmailSenderComponent.prototype.resetConfirm = (options, callback) => {
//     let resetPassEmailForm = {
//         from: '"RDclone 👻" <foo@example.com>', // sender address
//         to: options.user.email, // list of receivers
//         subject: 'Password reset request✔', // Subject line
//         text: 'Click here to reset password', // plain text body
//         html: 'http://localhost:' + config.process.ENV.PORT + '/resetpassword/:' + options.token // html body
//     };
    
//     EmailSenderComponent.transporter.sendMail(resetPassEmailForm, (error, info) => {
//         if (error) {
//             return callback(error)
//         }
//         console.log('Message sent: %s', info.messageId);
//         return callback(null, info);
//     });
// };

module.exports = EmailSenderComponent;
//{
//  user:'test'
//  token: 123456789
//}

//{
//  token: 123456789
//  user:'test'
//}

// EmailSenderComponent.resetPassEmailForm = (options) =>({
//     from: '"RDclone 👻" <foo@example.com>', // sender address
//     to: options.user.email, // list of receivers
//     subject: options.subject, // Subject line
//     text: 'Click here to reset password', // plain text body
//     html: 'http://localhost:' + config.process.ENV.PORT + '/resetpassword/:' + options.token // html body
// });

// EmailSenderComponent.passwordUpdateEmailForm = (user)=>({
//     from: '"RDclone 👻" <foo@example.com>', // sender address
//     to: user.email, // list of receivers
//     subject: 'Password update confirmation ✔', // Subject line
//     text: 'Hello ' + user.username + '. Your password has been successfuly updated', // plain text body
//     html: '<b>Hello world?</b>' // html body
// })

// EmailSenderComponent.sendReset = (req, res) => { transporter.sendMail(req.options, (error, info) => {
//     if (error) {
//         return res.status(500).json({
//             message: err.message
//         });
//     }
//     console.log('Message sent: %s', info.messageId);

// });
// }
