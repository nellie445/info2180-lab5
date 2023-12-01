document.addEventListener('DOMContentLoaded', function () {

    // Wait for the DOM to be fully loaded

    // Find the "Lookup City" button by its ID
    var lookupCityButton = document.getElementById('lookupcity');

    // Find the input field by its ID
    var countryInput = document.getElementById('country');

    // Attach click event listener to the "Lookup City" button
    lookupCityButton.addEventListener('click', performCityLookup);

    // Attach a keypress event listener to the input field
    countryInput.addEventListener('keypress', function (event) {

        // Check if the pressed key is "Enter"
        if (event.key === 'Enter') {

            performCityLookup();

        }

    });

    // Function to perform the city lookup
    function performCityLookup() {

        // Get the value entered by the user
        var countryValue = countryInput.value.trim();

        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Define the callback function to handle the response
        xhr.onload = function () {

            // Find the result div by its ID
            var resultDiv = document.getElementById('result');

            // Update the result div with the response from the server
            resultDiv.innerHTML = xhr.responseText;

        };

        // Construct the URL with the country parameter and set lookup to 'city'
        var url = 'world.php?country=' + encodeURIComponent(countryValue) + '&lookup=city';

        // Open a GET request to the server
        xhr.open('GET', url, true);

        // Send the request
        xhr.send();
    }
});
