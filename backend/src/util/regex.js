module.exports = {
    regexName: /^(?=.*?[a-zA-Zà-úÀ-Ú]).{1,12}$/i,
    regexEmail: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
    regexPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/i
}