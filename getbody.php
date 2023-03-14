<?php
$servername = "localhost";
$username = "def";
$password = "defpass";

$conn = new mysqli($severname, $username, $password, "def");

if ($conn->connect_error)
{
    die ("Unable to connect to server! " . $conn->connect_error);
}

$defArray = array();
$count = 0;
$result = mysqli_query($conn, "SELECT text FROM definitionBody;");
if ($result->num_rows > 0)
{
    while ($row = $result->fetch_assoc())
    {
        echo $row["text"];
    }
}

?>