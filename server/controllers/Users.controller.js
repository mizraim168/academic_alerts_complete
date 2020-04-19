const user = require('../models/Users');
const alert = require('../models/Alerts');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
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

    <h1>¡Gracias por formar parte de Alertas académicas!<h1>
    <p>El último paso es verificar tu cuenta dando click en el siguiente botón</p>
    <a class="waves-effect waves-light btn"  href="http://localhost:4200/main/home">Verificar cuenta</a>

  </body>
</html>

`

// /GET all users

userController.getUsers = async (req, res) =>{
    
   const users =  await user.find();
   res.json(users); 

   
} 

userController.completeData = async (req, res) =>{
        // tomar el id del usuario actual
        // verifyToken(req, res);
        // const el_id = req.userId;
        // console.log('el id chido');
        // console.log( el_id);
        // const id_final = el_id.toString();
        // console.log('el id final es:');
        // console.log(id_final);
    
    // res.json({UserId: req.userId})
    const collName = alert.collection.collectionName;
    console.log(collName);


    // const getUs = await user.findById(req.params.id)
    // res.json(getUs._id); 
    // const el_id_chido = getUs._id;
    const data = await user.aggregate([
    // { $match: { _id: id } },
    {
        $lookup: {
          from: collName,
          localField: '_id',
          foreignField: 'id_user',
          as: 'Alerts'
        }
    }], (err, userData) =>{
    
        // console.log('el id del user');
        
        // console.log(el_id_chido);
        

        console.log(Object.keys(userData));
        
        const data = userData[0].Alerts[0]; //pasar el id
        console.log(userData[0].Alerts[0]);
        console.log('esto tiene data');
        console.log(data);
        // const userDa = new dat(userData[0])
        //  userDa.save();
        res.json(userData);
    })
//     // console.log('la query es: *************');
//     // console.log(query);
    
    


    // res.json(data)
}
// /GET only one user
userController.getUser = async (req , res) =>{
    // verifyToken(req, res);
    const getUs = await user.findById(req.params.id)
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
        role: req.body.role,
        alerts: req.body.alerts,
        direction: req.body.direction
    }
    const newUser = new user(OneUser)
    await newUser.save();

    //Create access token
    const accessToken = jwt.sign({_id: newUser._id}, Secret_Key);
    // Function with email settings
    emailSettings(req, res);
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
                    UserName: user.name,
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
        role: req.body.role,
        direction: req.body.direction
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

function emailSettings(req, res){
    //EMAIL BLOCK CODE START

    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // smtp.outlook.com
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'testarv63@gmail.com',
            pass: 'linkinpark4'
        }
    });
    // setup e-mail data with unicode symbols
    let mailOptions = {
        from: 'Test <testarv63@gmail.com>', // sender address
        to: 'mizraimeliab168@gmail.com', // list of receivers //mizraimeliab168@gmail.com
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
    // EMAIL BLOCK CODE END
}

 
module.exports = userController;


