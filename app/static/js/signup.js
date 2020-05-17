$(document).ready(function() {

    $('form input').keyup(function(e) {
        var key = e.which;
        if(key == 13 && !($('#btnSignup').attr('disabled'))) {
            $('#btnSignup').trigger('click');
           return false;  
        }
    });


    $('#btnSignup').click(function() {
        
        $('small').remove()

        var error = false;
        if ($('#username').val().length < 4 || $('#username').val().length > 14) {
            $('#username-input').append('<small class="form-text text-muted text-danger animated fadeInUp fast">Username must be between 4 and 15 characters</small>');
            $('#username').addClass('invalid');
            error = true;
        }
        else {
            $('#username').removeClass('invalid');
        }

        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ($('#email').val().length < 1) {
            $('#email-input').append('<small class="form-text text-muted text-danger animated fadeInUp fast">Email address required</small>');
            $('#email').addClass('invalid');
            error = true;
        }
        else if (!regex.test($('#email').val())) {
            $('#email-input').append('<small class="form-text text-muted text-danger animated fadeInUp fast">Invalid email address</small>');
            $('#email').addClass('invalid');
            error = true;
        }
        else {
            $('#email').removeClass('invalid');
        }

        var regex = /^(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
        if ($('#password').val().length < 1) {
            $('#passwordHelpBlock').remove()
            $('#password-input').append('<small class="form-text text-muted text-danger animated fadeInUp fast">Your password must be 8-20 characters and contain letters, numbers, and special characters</small>');
            $('#password').addClass('invalid');
            error = true;
        }
        else if (!regex.test($('#password').val())) {
            $('#passwordHelpBlock').remove()
            $('#password-input').append('<small class="form-text text-muted text-danger animated fadeInUp fast">Your password must be 8-20 characters and contain letters, numbers, and special characters</small>');
            $('#password').addClass('invalid');
            error = true;
        }
        else {
            $('#password-input').append('<small class="form-text text-muted animated fadeInUp fast">Your password must be 8-20 characters and contain letters, numbers, and special characters</small>');
            $('#password').removeClass('invalid');
        }

        if ($('#confirm-password').val() != $('#password').val()) {
            $('#confirm-input').append('<small class="form-text text-muted text-danger animated fadeInUp fast">Passwords do not match.</small>');
            $('#confirm-password').addClass('invalid');
            error = true;
        }
        else {
            $('#confirm-password').removeClass('invalid');
        }

        if (error) {
            return;
        }

        $('#btnSignup').html('<span id="spinner" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span><text id="spinner-text">Loading...</text>').addClass('disabled');
        $.ajax({
			data : {
				username : $('#username').val(),
                password : $('#password').val(),
                email: $('#email').val()
			},
			type : 'POST',
            url : '/signup',
            success: function(){
                $('#btnSignup').hide();
                $('#checkmark-ani').show();
                function redirect(){
                    window.location.replace("http://localhost:5000/");
                };
                window.setTimeout(redirect, 1400 );
            },
            error: function(){
                $('#spinner').remove();
                $('#spinner-text').remove();
            }
        })
    });


    $('#alert-close').click(function() {
        $('#creds-alert').hide();
    })

});
