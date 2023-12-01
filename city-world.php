<?php

    $host = 'localhost';
    $username = 'lab5_user';
    $password = 'password123';
    $dbname = 'world';

    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

    # Check if the country parameter is set in the GET request
    
    if (isset($_GET['country'])) 
    {
    
        $country = $_GET['country'];

        # City lookup
        
        $stmt = $conn->prepare("SELECT * FROM cities WHERE country_code IN (SELECT code FROM countries WHERE name LIKE :country)");
        $stmt->bindValue(':country', '%' . $country . '%', PDO::PARAM_STR);

        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($results) 
        {
         
            # Output the results in an HTML table for cities
         
            echo '<table class="result-table">
                    <thead>
                        <tr>
                            <th>City Name</th>
                            <th>District</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>';

            foreach ($results as $row) 
            {
            
                echo '<tr>
                        <td>' . $row['name'] . '</td>
                        <td>' . $row['district'] . '</td>
                        <td>' . $row['population'] . '</td>
                    </tr>';
            
            }

            echo '</tbody></table>';
        
        } 
        else 
        {
        
            echo 'No matching cities found.';
        
        }
    
    } 
    else 
    {
    
        echo 'Country parameter not set.';
    
    }

?>
