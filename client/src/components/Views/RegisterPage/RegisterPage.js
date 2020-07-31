import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEamilHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // page refresh 방지

        if(Password !== ConfirmPassword){
            return alert("비밀번호가 다릅니다.");
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        // Action : loginUser (user_action.js에 생성)
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login'); // page 이동
                } else {
                    alert('Failed to sign up');
                } // 추후 이미 존재하는 회원일 경우 추가할 것
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEamilHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />

                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
