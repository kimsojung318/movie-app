import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Axios from 'axios';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {
        // Favorite List에 넣은 숫자 정보 얻기 → mongoDB 한테 요청
        // server/routes/favorite.js 한테 요청
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            // console.log(response.data)
            setFavoriteNumber(response.data.favoriteNumber)
            if(response.data.success){
            } else{
                alert('숫자 정보를 가져오지 못했습니다.');
            }
        })

        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success){
                // console.log('favorited', response.data)
                // favorited {success: true, favorited: false}

                setFavorited(response.data.favorited)
            } else{
                alert('정보를 가져오지 못했습니다.');
            }
        })
    }, [])

    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber -1)
                    setFavorited(!Favorited)
                } else{
                    alert('Favorite List 삭제 실패');
                }
            })
        } else{
            Axios.post('/api/favorite/addToFavorite', variables )
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber +1)
                    setFavorited(!Favorited)
                } else{
                    alert('Favorite List 추가 실패');
                }
            })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>
                {Favorited ? "Not Favorite" : "Add to Favorite"} &nbsp;
                {FavoriteNumber}
            </Button>
        </div>
    )
}

export default Favorite