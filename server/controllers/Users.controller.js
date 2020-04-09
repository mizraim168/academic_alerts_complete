const user = require('../models/Users');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const Secret_Key = 'secret_key_utags';
const saltRounds = 10; //for production mode set 12 saltRounds

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
    // verifyToken(req, res);
    const getUs = await user.findById(req.params.id);
    res.json(getUs); 
}

userController.profile = async (req, res) =>{
    verifyToken(req, res);
    // res.send(req.userId)
    res.json({UserId: req.userId})
}
// /POST new user
userController.createUser = async (req, res) => {
    // create hash password
    let pass = req.body.password;
    const hash = bcrypt.hashSync(pass, saltRounds);
    // end hash password

    const OneUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        motherlastname: req.body.motherlastname,
        email: req.body.email,
        password: hash,
        role: req.body.role
    }
    const newUser = new user(OneUser)
    await newUser.save();

    //Create access token
    const accessToken = jwt.sign({_id: newUser._id}, Secret_Key);
    // Function with email settings
    emailSettings();
    res.json({
        status: "User saved",
        token: accessToken
    });

}


//POST USER NEW (login system)
userController.login = async (req, res) =>{
    
    console.log(req.headers.authorization);
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

     await user.findOne({email: userData.email}, (err, user)=>{
        // console.log(user.password);
        console.log(user);
        
        if (err) return res.status(400)
        if (!user) {
            res.json({
                status: 'Something is wrong'
            })
        }else{
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                const accessToken = jwt.sign({_id: user._id}, Secret_Key)
                res.json({
                    status: 'OK User was found',
                    UserEmail: user.email,
                    UserLastname: user.lastname,
                    UserRole: user.role,
                    token: accessToken
                })
            }else{
                res.json({
                    status: 'User not found'
                })
            }
        }
        
    });
    // console.log(UserFound);
    
       
    // if (UserFound) {
    //     res.json({
    //         status: 'User Found',
    //         User: userData
    //     })
    // }else{
    //     res.json({
    //         status:'User not found'}
    //         )
    // }
}
// /PUT update user
userController.editUser = async (req, res) =>{
    const {id} = req.params;
    let pass = req.body.password;
    const hash = bcrypt.hashSync(pass, saltRounds);
    const oneUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        motherlastname: req.body.motherlastname,
        email: req.body.email,
        password: hash,
        confirm_password: req.body.confirm_password,
        role: req.body.role
    };
    await user.findByIdAndUpdate(id, {$set: oneUser}, {new:true} );
    res.json({
        status: "User Updated"
    })
}

// DELETE user
userController.deleteUser = async (req, res) =>{
    await user.findByIdAndRemove(req.params.id);
    res.json({
        status: "User Deleted"
    })
}


function verifyToken  (req, res , next){

    if(!req.headers.authorization){
        return res.status(401).send('Authorization: falied')
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Authorization: falied')
    }
    const payload = jwt.verify(token, Secret_Key)
    console.log(req.headers.authorization);
    console.log(payload);
    req.userId = payload._id;

    console.log(req.userId);
  
}

function emailSettings(){
    //EMAIL BLOCK CODE START

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
    //EMAIL BLOCK CODE END
}

 
module.exports = userController;


