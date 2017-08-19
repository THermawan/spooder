function getCookie(NameOfCookie)
{
	if (document.cookie.length > 0)
	{
		begin = document.cookie.indexOf(NameOfCookie+"=");
		if (begin != -1)
		{
			begin += NameOfCookie.length+1;
			end = document.cookie.indexOf(";", begin);
			if (end == -1) end = document.cookie.length;
			return unescape(document.cookie.substring(begin, end));
		}
	}
	return null;
}


$(document).ready(function() {
	$("form#editForm").submit(function(e) {
		e.preventDefault();

		var dataPass = $("form#editForm").serialize();
		$.ajax({
			url : "edit.php",
			type : "GET",
			data : dataPass,
			success : function(data) {
				//data  = JSON.stringify(data);
				//data = $.trim(data);
				/* NOTE: the data setting is different to the data parameter of the success setting. 
				The data setting is the data to be passed to the server database.
				The data parameter is the data that is returned from the server.
				Look at the console to observe this difference
				*/
				
				
				/* NOTE: when testing for the data returned, be sure to include a \n escape character for the end of line */

				/* The output of the script is checked, and a different action (in this case an alert box) is taken depending on the result.*/
				sessionStorage.setItem("loggedIn", "true");
				sessionStorage.setItem("avatar", getCookie("avatar"));
				window.location.assign("profile.html");

			}
		});
	});
});
