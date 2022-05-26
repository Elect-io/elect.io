const validateEmail = (email) => {
    let r = /^\S+@\S+\.\S+$/;
    return r.test(email);
}

export default validateEmail;