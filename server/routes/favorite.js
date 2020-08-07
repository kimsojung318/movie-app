const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

// MovieDetail/Sections/Favorite.js 요청을 받음
router.post('/favoriteNumber', (req, res) => { // server/index.js app.use 기재하여 EndPoint 생략 가능

    // mongoDB에서 favorite 숫자를 가져온다.
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            // 그 다음 Front 측에 정보 전달
            res.status(200).json({
                success: true,
                favoriteNumber: info.length
            })
        })
})

// 사용자가 해당 영화를 Favorite List에 넣었는지 확인
router.post('/favorited', (req, res) => {
    Favorite.find({
        "movieId": req.body.movieId,
        "userFrom": req.body.userFrom
    })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (info.length != 0) {
                result = true;
            }

            res.status(200).json({
                success: true,
                favorited: result
            })
        })
})

// Favorite List 삭제
router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom
    }).exec((err, doc) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, doc })
    })
})

// Favorite List 추가
router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body);

    // variables 정보가 favorite document에 들어가게 됨
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})

router.post('/getFavoredMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom
    }).exec((err, result) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})

module.exports = router;