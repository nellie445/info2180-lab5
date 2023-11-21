document.addEventListener('DOMContentLoaded', function() {
    var countryInput = document.getElementById('country');
    var lookupButton = document.getElementById('lookup');
    var resultDiv = document.getElementById('result');

    lookupButton.addEventListener('click', function() {
        //var countryName = countryInput.value;

        // Use fetch to make an AJAX request to your PHP script
        fetch('lookup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'country=' + encodeURIComponent(countryName),
        })
        .then(response => response.html())
        .then(data => {
            // Process the data and display it in the resultDiv
            resultDiv.innerHTML = formatResult(data);
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred. Please try again.';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var lookupButton = document.getElementById('lookup');
    var resultDiv = document.getElementById('result');
    
    lookupButton.addEventListener('click', function() {
        // Open an Ajax connection to fetch data from world.php
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                        
                    // Print the data into the resultDiv
                    resultDiv.innerHTML = xhr.responseText;
                } else {
                    console.error('Error:', xhr.status, xhr.statusText);
                    resultDiv.innerHTML = 'An error occurred. Please try again.';
                }
            }
        };
    
        // Get the country value from the input
        var countryInput = document.getElementById('country');
        var countryName = countryInput.value;
    
        // Make the Ajax request to world.php with the country as a GET parameter
        xhr.open('GET', 'world.php?country=' + encodeURIComponent(countryName), true);
        xhr.send();
    });

    function formatResult(data) {
        // Format the data as needed for display
        // This is just a basic example, you should adjust it based on your database structure
        if('error' in data){
            return '<p>Error: ${data.error}</p>';
        }
        //Format the data as neede for display
        return `
            <p>Country: ${data.country}</p>
            <p>Country Code: ${data.country_code}</p>
            <p>Population: ${data.population}</p>
            <p>Independence Year: ${data.independence_year}</p>
            <p>Government Form: ${data.government_form}</p>
            <p>Head of State: ${data.head_of_state}</p>
        `;
    }
});

