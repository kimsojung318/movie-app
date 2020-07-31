import React, { useEffect } from 'react';
import Axios from 'axios';
import {useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){
    // option : null(누구나 접근) / true(로그인 유저만 접근) / false(로그인 유저 접근 불가능)
    // adminRoute : 관리자만 접근 가능한 페이지 생성 시 사용 → Ex. Auth(Page, null, true)

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                // node.js Server에서 정의한 항목이 나타남
                console.log(response) 

                if(!response.payload.isAuth){ // 로그인 하지 않은 상태
                    if(option){ // option : true인 Page를 들어가려고 할 때
                        props.history.push('/login')
                    }
                } else{ // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){ // adminRoute : true + isAdmin : false → 로그인 유저지만 관리자는 아닌 경우
                        props.history.push('/')
                    } else{
                        if(option === false){ // 로그인 유저 접근 불가능 page를 들어가려고 할 때
                            props.history.push('/')
                        }
                    }
                } // else
            }) // then

            Axios.get('/api/users/auth')
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}