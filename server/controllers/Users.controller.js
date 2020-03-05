const user = require('../models/Users');
const nodemailer = require("nodemailer");

const userController = {};

const emailMessage = `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    
  </head>
  <body>

    <h1>¡Gracias por formar parte de Alertas acádemicas!<h1>
    <p>El último paso es verificar tu cuenta dando click en el siguiente botón</p>
    <button class="btn" style=" border: solid 1px black; border-raidus:25px; background-color:blue;">Verificar cuenta</button>

  </body>
</html>

`

// /GET all users

userController.getUsers = async (req, res) =>{
   const users =  await user.find();
   res.json(users);
} 
// /GET only one user
userController.getUser = async (req , res) =>{
    const getUs = await user.findById(req.params.id);
    res.json(getUs);
}
// /POST new user
userController.createUser = async (req, res) => {
    const newUser = new user(req.body);
    await newUser.save();
    
    let transporter = nodemailer.createTransport({
       host: 'smtp.googlemail.com',
       port: 465,
       secure: true, // use SSL
        auth: {
            user: 'testarv63@gmail.com',
            pass: 'linkinpark4'
        }
    });
// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Test <testarv63@gmail.com>', // sender address
    to: 'mizraimeliab168@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    html: emailMessage // html body
};


// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
    res.json({
        status: "User saved"
    });
}
// /PUT update user
userController.editUser = async (req, res) =>{
    const {id} = req.params;
    const oneUser = {
        email: req.params.email,
        password: req.params.password
    };
    await user.findByIdAndUpdate(id, {$set: oneUser}, {new:true} );
    res.json({
        status: "User Updated"
    })
}

// /DELETE user
userController.deleteUser = async (req, res) =>{
    await user.findByIdAndRemove(req.params.id);
    res.json({
        status: "User Deleted"
    })
}
 
module.exports = userController;