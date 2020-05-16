$(document).ready(function() {

    $('#logout').click(function() {
        
        $.ajax({
			type : 'POST',
            url : '/logout',
            success: function(){
                window.location.replace("http://localhost:5000/login");
            }
        })
    })

});