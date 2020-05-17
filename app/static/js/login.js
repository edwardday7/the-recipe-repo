$(document).ready(function() {
    
    $('form input').keyup(function(e) {
        var key = e.which;
        if(key == 13 && !($('#btnLogin').attr('disabled'))) {
            $('#btnLogin').trigger('click');
           return false;  
        }
    });


    $('#btnLogin').click(function() {

        $('#creds-alert').hide();
        $('input').removeClass('invalid');
        $('small').remove();
        var error = false;
        $('form input').each(function() {
            if ($(this).val() == '') {    
                error = true;
                $(this).addClass('invalid');
                var parentId = $(this).closest('div').attr('id');
                $('#' + parentId).append('<small class="form-text text-muted text-danger animated fadeInUp fast">' + $(this).attr('name') + ' is required!</small>');
            }
        })

        if (error) {
            return;
        }

        $('#btnLogin').html('<span id="spinner" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span><text id="spinner-text">Loading...</text>').addClass('disabled');
        $.ajax({
			data : {
				username : $('#username').val(),
				password : $('#password').val()
			},
			type : 'POST',
            url : '/login',
            success: function(){
                $('#btnLogin').hide();
                $('#checkmark-ani').show();
                function redirect(){
                    window.location.replace("http://localhost:5000/");
                };
                window.setTimeout(redirect, 1400 );
            },
            error: function(){
                $('#creds-alert').show();
                $('#spinner').remove();
                $('#spinner-text').remove();
                $('#btnLogin').html('Log In').removeClass('disabled');
            }
        })
    });


    $('#alert-close').click(function() {
        $('#creds-alert').hide();
    })

});
