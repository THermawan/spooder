<?php
// Establish a connection to the database (you need to set the connection parameters in the string).
// If you want to use a different database, you need to change the following settings to the appropriate values.
$dbconn = pg_connect("host=soit-db-pro-2.ucc.usyd.edu.au port=5432 dbname=y2016s01g40 user=y2016s01g40 password=nZW2Du5b");

// Get parameters from the query string.
// Creates a variable for each query parameter using the names given.
$str = $_SERVER['QUERY_STRING'];
parse_str($str);

// Print the vale of the username and passd parameters (currently commented out - delete the '#' characters to include these lines).
#echo "$username\n";
#echo "$passd\n";

// Construct and execute the sql query.
// pg_query_params function takes three values:
//   - A variable containing a connection to the database
//   - An SQL query (containing $1, $2, ... in place of values passed in by the user)
//   - An array containing variables to be used in place of $1, $2, ...
$result = pg_query_params($dbconn, 'SELECT username FROM users WHERE username = $1 and password = $2', array("$username", "$password"));

// Check the result of the query and write appropriate output.
// pg_fetch_row returns a row from a database query as an array, or false if no rows are left
if (pg_fetch_row($result)) {
	$result2 = pg_query_params($dbconn, 'SELECT email, username, game_highscore, quiz1_result, quiz2_result, quiz3_result, avatar FROM users WHERE username = $1', array("$username"));
	while($row = pg_fetch_assoc($result2)){
		setcookie("username", $row['username']);
		setcookie("game_highscore", $row['game_highscore']);
		setcookie("quiz1_result", $row['quiz1_result']);
		setcookie("quiz2_result", $row['quiz2_result']);
		setcookie("quiz3_result", $row['quiz3_result']);
		setcookie("avatar", $row['avatar']);
		setcookie("email", $row['email']);
	}
}
else
{
  echo "invalid\n";
}
?>