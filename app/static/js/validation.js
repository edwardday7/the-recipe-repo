$(document).ready(function() {

    $('#username').keyup(function(e) {
        var key = e.which;
        if(key == 13 && !($('#btnSubmit').attr('disabled'))) {
            $('#btnSubmit').trigger('click');
           return false;  
        }

        if($(this).val() != "" && $('#password').val() != "") {
            $('#btnSubmit').prop('disabled', false)
        }
        else {
            $('#btnSubmit').prop('disabled', true)
        }
    });

    $('#password').keyup(function(e) {
        var key = e.which;
        if(key == 13 && !($('#btnSubmit').attr('disabled'))) {
            $('#btnSubmit').trigger('click');
           return false;  
        }

        if($(this).val() != "" && $('#username').val() != "") {
            $('#btnSubmit').prop('disabled', false);
        }
        else {
            $('#btnSubmit').prop('disabled', true);
        }
    });


    $('#btnSubmit').click(function() {
        
        $.ajax({
			data : {
				username : $('#username').val(),
				password : $('#password').val()
			},
			type : 'POST',
            url : '/login',
            success: function(){
                $('#creds-alert').hide();
                $('#btnSubmit').hide();
                $('#checkmark-ani').show();
                function redirect(){
                    window.location.replace("http://localhost:5000/");
                };
                window.setTimeout(redirect, 1400 );
            },
            error: function(){
                $('#creds-alert').show();
            }
        })
    });


    $('#alert-close').click(function() {
        $('#creds-alert').hide();
    })

});
