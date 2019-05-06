const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username:{ type: String, 
        required: true, 
        min:[4,'too short'], 
        max: [32,'toolong,max is 128 characters']
    },
    email:{ type: String, 
        required: true, 
        min:[4,'too short'], 
        max: [32,'toolong,max is 128 characters'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        unique:true,
        lowercase:true,
        required:"email is required"
    },
    password:{ type: String, 
        required: 'pawssrod is required', 
        min:[4,'too short'],
        max: [32,'toolong,max is 128 characters'],
        required:"password is required"
        },
    rentals: [{type: Schema.Types.ObjectId , 
        ref: 'Rental'}]
}); 
UserSchema.methods.hasSamePassword = function(requestPassword){

    return bcrypt.compareSync(requestPassword,this.password)
}

UserSchema.pre('save',function(next){
    const user = this;
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(user.password,salt,function(err,hash){
            user.password = hash;
            next();
        })
    })
});

module.exports = mongoose.model('User',UserSchema)