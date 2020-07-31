const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리 로직

    // client cookie에서 token을 가져온다.
    let token = req.cookies.x_auth;

    // token 복호화 후 사용자를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        })

        // request에 넣어주는 이유 : auth.js에 있는 token + user를 index.js에서 호출 하기 위해
        req.token = token;
        req.user = user;

        next();
    })

    // 사용자 존재 시 인증 Ok

    // 미 존재 시 인증 No
}

module.exports = { auth }