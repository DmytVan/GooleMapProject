export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_REGISTRATION_FLAG = 'CHANGE_REGISTRATION_FLAG';
export const SING_IN = 'SING_IN';
export const REGISTRATION_USER = 'REGISTRATION_USER';
export const LOG_OUT = 'LOG_OUT';

export const changeEmail = (email) => {
    return {
        type: CHANGE_EMAIL,
        payload: email
    }
};

export const changePassword = (password) => {
    return {
        type: CHANGE_PASSWORD,
        payload: password
    }
};

export const singIn = (email) => {
    return {
        type: SING_IN,
        payload: email
    }
};

export const changeRegistrationFlag = (isRegistration) => {
    return {
        type: CHANGE_REGISTRATION_FLAG,
        payload: isRegistration
    }
};

export const registrationUser = (email, password) => {
    return {
        type: REGISTRATION_USER,
        payload: {
            email,
            password
        }
    }
};

export const logOut = () => {
    return {
        type: LOG_OUT,
    }
};

