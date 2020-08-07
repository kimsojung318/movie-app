const express = require('express') // express 모듈을 가져온다
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//const cors = require('cors')

const config = require("./config/key");

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

//app.use(cors())

// bodyParser가 client에서 오는 정보를 서버에서 분석 후 가져올 수 있도록 하기 위해 추가
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

// 기재하지 않을 시 모든 서비스의 api를 해당 파일에 넣어줘야한다.
// app.use('/api/user', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('DAY6'))

app.get('/api/hello', (req, res) => {
    res.send("집 보내줘.")
})

app.post('/api/users/register', (req, res) => { // 회원가입을 위한 Route
    // 회원가입 시 필요한 정보를 client에서 가져오면 DB에 넣어준다.
    const user = new User(req.body);

    // PW 암호화

    user.save((err, userInfo) => { // MongoDB에서 오는 메소드 / ()안은 콜백함수
        if (err) return res.json({ success: false, err }) // json 형태로 err 메시지와 함께 전달
        return res.status(200).json({ // 전달 성공할 경우
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 1. 요청된 email이 DB에 있는 지 확인
    User.findOne({ email: req.body.email}, (err, user) => { // mongoDB에서 제공하는 메소드
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 회원이 없습니다."
            })
        } // if

        // 2. 요청된 email이 DB에 있다면 PW가 맞는 지 확인
        user.comparePassword(req.body.password, (err, isMatch) => { // User.js에서 메소드 구성
            if(!isMatch) return res.json({
                loginSuccess: false,
                message: "비밀번호가 일치하지 않습니다."
            })

            // 3. email + PW가 동일할 경우 token 생성
            user.generateToken((err, user) => { // user는 token을 받아온다.
                if(err) return res.status(400).send(err)

                // token을 cookie에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId: user._id
                })
            }) 

        }) // comparePassword
    }) // findOne
}) // post

// 0 → true 일반 사용자 / false 관리자
// auth : endpoint에서 req 받고 callback function 하기 전에 중간에서 기능을 하는 것?
app.get('/api/users/auth', auth, (req, res) =>{ 
    // 여기까지 middleware를 통과해 있다는 것은 Authentication이 true 라는 것.
    res.status(200).json({ // client한테 전달
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, 
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

/*app.get('/api/users/logout', auth, (req, res) => {
    // DB에서 사용자를 찾는다.
    User.findOneAndUpdate({ _id: req.user._id }, 
    { token: "" }, 
    (err, user) => {
        if(err) return req.json({success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})*/

app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
      { token: "" }
      , (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        })
      })
  })

const port = 5000

app.listen(port, () => 
console.log(`Example app listening at http://localhost:${port}`))