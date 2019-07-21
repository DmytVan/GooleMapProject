import React from 'react';
import './index.css'
import {connect} from 'react-redux';
import InputForSingIn from './InputForSingIn'
import {Redirect} from 'react-router-dom';
import {
    changeEmail,
    changePassword,
    singIn,
    changeRegistrationFlag,
    registrationUser,
    logOut
} from "../../store/Authorization/actions";


class Authorization extends React.Component {


    onSubmit(event, email, password, users, singIn) {
        if (email && password.length > 4 && users[email] === password) {
            singIn(email);

        } else {
            alert('wrong login or password');
        }
        event.preventDefault();
    };

    onRegistration(event, email, password, users, registrationUser, singIn) {
        if (email && password.length > 4 && users[email] === undefined) {
            registrationUser(email, password);
            singIn(email);
        } else {
            alert(`user ${email} is registered`);
        }

        event.preventDefault();
    };

    render() {
        const {email, password, isRegistration, users, changeEmail, changePassword, singIn, changeRegistrationFlag, registrationUser, isSingIn, logOut} = this.props;
        if (isSingIn) {
            return (
                <div>
                    <p>You are already logged in. <button onClick={logOut}>Log Out</button></p>
                </div>
            )
            //return <Redirect to="/"/>
        }
        return (
            <div className='authorizationForm'>
                <form onSubmit={(event) => {
                    if (isRegistration) {
                        this.onRegistration(event, email, password, users, registrationUser, singIn)
                    } else {
                        this.onSubmit(event, email, password, users, singIn)
                    }
                }}>
                    <fieldset>
                        <legend>{isRegistration ? 'Registration' : "Sign in"}</legend>
                        <InputForSingIn type='email' text='E-mail' value={email} onChange={(event) => {
                            changeEmail(event.target.value)
                        }}/>
                        <InputForSingIn type='password' text='Password' value={password} onChange={(event) => {
                            changePassword(event.target.value)
                        }}/>
                        <p>{isRegistration ? 'Enter account: ' : 'Register a new user: '} <a
                            onClick={() => {
                                changeRegistrationFlag(!isRegistration)
                            }}>{isRegistration ? 'Sign in' : "Registration"} </a></p>
                        <p><input type="submit" value="Ok"/></p>
                    </fieldset>


                </form>

            </div>
        )
    }
}

const putStateToProps = (state) => {
    return {
        email: state.authorization.email,
        password: state.authorization.password,
        isRegistration: state.authorization.isRegistration,
        users: state.authorization.users,
        isSingIn: state.authorization.isSingIn
    }
};

const putActionToProps = {
    changeEmail,
    changePassword,
    changeRegistrationFlag,
    registrationUser,
    singIn,
    logOut
};

export default connect(putStateToProps, putActionToProps)(Authorization);

