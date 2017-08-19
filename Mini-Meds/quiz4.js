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
	$("form#quiz4").submit(function(e) {
		e.preventDefault();

		var dataPass = $("form#quiz4").serialize();
		$.ajax({
			url : "quiz4.php",
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
				sessionStorage.setItem("quiz4_result", getCookie("quiz4_result"));
				window.location.assign("quiz4Result.html");
			}
		});
	});
});
