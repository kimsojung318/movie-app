const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt가 몇 글자인지 나타냄
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    img: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){ // user 정보를 저장하기 전에 실행
    var user = this; // userSchema를 가리킨다.

    if(user.isModified('password')){ // PW 변경 시에만 PW 암호화
        // PW 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash;
                next();
            })
        });
    } else{
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){ // cb == callback
    // plainPassword : 12345678 
    // 암호화된 PW : $2b$10$im5I4MquRuysjHaunwdlo.4UOUAe9t33Biyk4EbYzjzeKXos8k7cq

    // 복호화할 수 없기 때문에 plainPassword를 암호화하여 동일한 지 비교한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
} // comparePassword

userSchema.methods.generateToken = function(cb){
    var user = this;

    // jsonwebtoken 사용하여 token 생성

    var token = jwt.sign(user._id.toHexString(), 'secretToken'); // DB에 있는 _id
    // user._id + 'secretToken' = token
    // 'secretToken'을 알면 user._id를 알 수 있다.

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })

} // generateToken

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // token decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 사용자 id를 사용하여 사용자를 찾은 다음
        // client에서 가져온 token과 DB에 보관된 token이 일치하는 지 확인

        user.findOne({
            "_id": decoded,
            "token": token
        }, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User } // 다른 파일에서도 사용할 수 있도록 설정
