import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMoviesImage, setMainMoviesImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}& language=en-US&page=1`;
        fetchMovies(endpoint);
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response.results)
                setMovies([...Movies, ...response.results])
                setMainMoviesImage(response.results[0])
                setCurrentPage(response.page)
            })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {/* 영화 정보를 가져오기 전에 랜더링했기 때문에 오류 발생함으로 추가함 */}
            {MainMoviesImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMoviesImage.backdrop_path}`}
                    title={MainMoviesImage.original_title}
                    text={MainMoviesImage.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* movie Grid Cards */}
                <Row>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            {/* poster_path가 없는 경우 처리 */}
                            <GridCards
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage