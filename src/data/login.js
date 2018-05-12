$(function(){
	$('#username').focus().blur(checkName);
	$('#password').blur(checkPassword);
});

function checkName(){
	var name = $('#username').val();
	if(name == null || name == ""){
		$('#count-msg').html("User name can't be blank");
		return false;
	}
	$('#count-msg').empty();
	return true;
}

function checkPassword(){
	var password = $('#password').val();
	if(password == null || password == ""){
		$('#password-msg').html("Password can't be blank");
		return false;
	}
	$('#password-msg').empty();
	return true;
}