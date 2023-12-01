document.addEventListener('DOMContentLoaded', function () {

    // Find the "Lookup Country" button by its ID
    var lookupCountryButton = document.getElementById('lookupcntry');

    // Find the input field by its ID
    var countryInput = document.getElementById('country');

    // Attach click event listener to the "Lookup Country" button
    lookupCountryButton.addEventListener('click', performLookup);

    // Attach a keypress event listener to the input field
    countryInput.addEventListener('keypress', function (event) {
        // Check if the pressed key is "Enter"
        if (event.key === 'Enter') {
            performLookup();
        }
    });

    // Function to perform the lookup
    function performLookup() {
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

        // Construct the URL with the country parameter
        var url = 'world.php?country=' + encodeURIComponent(countryValue);

        // Open a GET request to the server
        xhr.open('GET', url, true);

        // Send the request
        xhr.send();
    }

});
