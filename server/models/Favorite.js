const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId, // Id만 가지고 있으면 사용자 모든 정보를 가져올 수 있다.
        ref: 'User' // ObjectId를 type으로 지정하면 ref으로 감싸주어야 한다.
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite } // 다른 파일에서도 사용할 수 있도록 설정