<?php
if (isset($_POST["name"]))
{
    $name = $_POST["name"];


    $servername = "localhost";
    $username = "def";
    $password = "defpass";
    
    $conn = new mysqli($severname, $username, $password, "def");
    
    if ($conn->connect_error)
    {
        die ("Unable to connect to server! " . $conn->connect_error);
    }
    
    $query = "SELECT text FROM definitionBody WHERE name = '"+ $name + "';";
    if ($result->num_rows > 0)
    {
        echo 
    }
}

?>