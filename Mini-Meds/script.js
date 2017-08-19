function setCookie(NameOfCookie, value, expiredays)
{
	var ExpireDate = new Date ();
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
	document.cookie = NameOfCookie + "=" + escape(value) +
	((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

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


function checkLoggedIn(){
	if(sessionStorage.getItem("loggedIn") == "true"){
		document.getElementById("login").href = "profile.html";
		document.getElementById("login").innerHTML = "Profile";
		setCookie("email", sessionStorage.getItem("email"), 1);
	}
	else{
		sessionStorage.setItem("loggedIn", "false");
	}
}

function show_quiz4_result(){
	console.log("Made it");
	var text = "Your result for quiz 4 is: " + sessionStorage.getItem("quiz4_result") + "/16";

	document.getElementById("quiz4_resulthere").innerHTML = text;
}

function logout(){
	sessionStorage.setItem("loggedIn", "false");
	sessionStorage.setItem("username", null);
	sessionStorage.setItem("email", null);
	sessionStorage.setItem("game_highscore", null);
	sessionStorage.setItem("quiz1_result", null);
	sessionStorage.setItem("quiz2_result", null);
	sessionStorage.setItem("quiz3_result", null);
	sessionStorage.setItem("quiz4_result", null);
	sessionStorage.setItem("avatar", null);
	window.location.assign("login.html");
}

function register(){
	window.location.assign("register.html");
}

function edit(){
	window.location.assign("editProfile.html");
}

function quiz1(){
	window.location.assign("quiz1.html");
}
function quiz2(){
	window.location.assign("quiz2.html");
}
function quiz3(){
	window.location.assign("quiz3.html");
}
function quiz4(){
	window.location.assign("quiz4.html");
}

function profile(){
	var avatar_src = ["icons/Cat.png", "icons/Cheetah.png", "icons/Chicken.png", "icons/Cow.png", "icons/Dog.png", "icons/Elephant.png", "icons/Fox.png", "icons/Lion.png", "icons/Lioness.png", "icons/Monkey.png", "icons/Owl.png", "icons/Panda.png", "icons/Penguin.png", "icons/Pig.png", "icons/Sheep.png", "icons/Tiger.png"];
	var avatar_alts = ["Cat", "Cheetah", "Chicken", "Cow", "Dog", "Elephant", "Fox", "Lion", "Lioness", "Monkey", "Owl", "Panda", "Penguin", "Pig", "Sheep", "Tiger"];
	document.getElementById("profileUsername").innerHTML = sessionStorage.getItem("username");
	document.getElementById("profileGameHS").innerHTML = sessionStorage.getItem("game_highscore");
	document.getElementById("profileQuiz1").innerHTML = sessionStorage.getItem("quiz1_result");
	document.getElementById("profileQuiz2").innerHTML = sessionStorage.getItem("quiz2_result");
	document.getElementById("profileQuiz3").innerHTML = sessionStorage.getItem("quiz3_result");
	var avatar = sessionStorage.getItem("avatar");
	avatar = avatar.trim();

	var i = avatar_alts.indexOf(avatar);

	document.getElementById("profileAvatar").src = avatar_src[i];
	document.getElementById("profileAvatar").alt = avatar_alts[i];
	setCookie("email", sessionStorage.getItem("email"), 1);;
}

function editProfile(){
	var avatar = sessionStorage.getItem("avatar");
	avatar = avatar.trim();
	document.getElementById(avatar).checked = true;
	setCookie("email", sessionStorage.getItem("email"), 1);;
}