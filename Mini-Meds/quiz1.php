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
$email = $_COOKIE["email"];

$quiz1_result = 0;
if("$question1" == "true"){
	$quiz1_result ++;
}
if("$question2" == "true"){
	$quiz1_result ++;
}
if("$question3" == "true"){
	$quiz1_result ++;
}
if("$question4" == "true"){
	$quiz1_result ++;
}
$result = pg_query_params($dbconn, 'UPDATE users SET quiz1_result = $1 WHERE email = $2', array("$quiz1_result", "$email"));

// Check the result of the query and write appropriate output.
// pg_fetch_row returns a row from a database query as an array, or false if no rows are left
$result2 = pg_query_params($dbconn, 'SELECT quiz1_result FROM users WHERE email = $1', array("$email"));
while($row = pg_fetch_assoc($result2)){
	setcookie("quiz1_result", $row['quiz1_result']);
}


?>