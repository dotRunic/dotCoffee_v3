let isRegisterSuccessful = localStorage.getItem("register.successful");
if(isRegisterSuccessful !== undefined && isRegisterSuccessful === 'true') {
    $('#register-success-alert').show()
    localStorage.removeItem("register.successful")
}

$('#btn-login').click((e) => {

    e.preventDefault();
    const usernameSelector = $('#username');
    const passwordSelector = $('#password');
    const registerSuccessSelector = $('#register-success-alert');
    registerSuccessSelector.hide();
    const username = usernameSelector.val().trim();
    const password = passwordSelector.val().trim();

    const isUsernameValid = username !== undefined && username !== '';
    const isPasswordValid = password !== undefined && password !== '';

    if(!isUsernameValid) {
        usernameSelector.addClass("is-invalid")
    }
    if(!isPasswordValid) {
        passwordSelector.addClass("is-invalid")
    }
    if(isPasswordValid && isUsernameValid) {
        usernameSelector.removeClass("is-invalid")
        passwordSelector.removeClass("is-invalid")
        $.ajax({
            url: 'http://localhost:8080/login',
            type: 'post',
            data: JSON.stringify({username: username, password: password}),
            contentType: 'application/json; charset=utf-8',
            success: function (result, status, xhr) {
                if(status === 'success'){
                    $('#login-error-alert').hide()
                    localStorage.setItem("user.id", result.id);
                    localStorage.setItem("user.firstname", result.firstname);
                    localStorage.setItem("user.lastname", result.lastname);
                    localStorage.setItem("user.type", result.userType);
                    window.location = "./index.html";
                    $('#login-error-alert').hide()
                } else {
                    $('#login-error-alert').show();
                }
            },
            error: function (xhr, status, error) {
                $('#login-error-alert').show();
            }
        });
    }
})