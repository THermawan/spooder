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

$quiz4_result = 0;
$quiz4_result += "$question1";
$quiz4_result += "$question2";
$quiz4_result += "$question3";
$quiz4_result += "$question4";
$quiz4_result += "$question5";
$quiz4_result += "$question6";
$quiz4_result += "$question7";
$quiz4_result += "$question8";

setcookie("quiz4_result", $quiz4_result);


// Check the result of the query and write appropriate output.
// pg_fetch_row returns a row from a database query as an array, or false if no rows are left



?>