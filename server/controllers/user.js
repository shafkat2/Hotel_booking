const User = require('../models/users');
const MongoosHelpers = require('../helpers/mongoose');
const Jwt = require('jsonwebtoken')
const config = require('../config/def')

exports.auth = function(req,res){
    const {email, password} = req.body;
    if(!password || !email){
        return  res.status(422).send({error:[{title:'Data Missing', detail:'Provide Email and Password'}]});
      }
    User.findOne({email},function(err,user){
        if(err){
            return res.status(422).send({errors: MongoosHelpers.nomralizeErrors(err.errors)});
        }
        else if(!user){
            return  res.status(422).send({error:[{title:'User Missing', detail:'User does not exist'}]});

        }
        if(user.hasSamePassword(password)){
            const token = Jwt.sign({
                userId: user.id,
                userName: user.username
            },config.SECRET,{expiresIn: '1h'})
           return res.json(token);
        }
        else{
            return res.status(422).send({error:[{title:'Wrong Data', detail:'Wrong Email or Password'}]});
        }
   
    
    })
}

exports.reg = function(req,res){
    const {username, email, password, passwordConfirmaion} = req.body;
    if(!username || !email){
      return  res.status(422).send({error:[{title:'Data Missing', detail:'Provide Email and Password'}]});
    }
    if(password !== passwordConfirmaion){
       return res.status(422).send({error:[{title:'Invalid Password', detail:'Passowrd mismatch'}]});
    }
    User.findOne({email: email},function(err,existingUser){
        if(err){
            return res.status(422).send({'mongose': "handle moongose eror in next lecture"});
        }

        if(existingUser){
            return res.status(422).send({error:[{title:'Invalid email', detail:'email already exits'}]});
        }
        const user = new User({
          username,email,password
        });

        user.save(function(err){
            if(err){
                console.log(err)
                return res.status(422).send({errors: MongoosHelpers.nomralizeErrors(err.errors)});
            }
        return res.json({'registered': true});
        })
    })


 
}
exports.authMiddleware = function(req,res){
    const token = req.headers.authorization;

    if(token){
        const user = parseToken(token)

        User.findById(user.userId,function(err, user){
            if (err){
                return res.status(422).send({error: nomralizeErrors(err.errors)})
            }

            if(user){
                res.locals.user = user;
                next();
            }else{
                return res.status(422).send({error:[{title:'Not authroized', detail:'You need to login to get acces'}]});
            }
        });

    }else{
        return res.status(422).send({error:[{title:'Not authroized', detail:'You need to login to get acces'}]});
    }


 
}
function parseToken(token){

    var decoded = jwt.verify(token.split(' ')[1], config.SECRET);


    return decoded;
}