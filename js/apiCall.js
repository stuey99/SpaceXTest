const requestYear = "2020";    


// Call API to find out next launch
fetch('https://api.spacexdata.com/v3/launches/next')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      // Set the nextFlightNumber so when we cycle through we can
      // see if we need to highlight it
        var nextFlightNumber = data.flight_number;

        fetch('https://api.spacexdata.com/v3/launches?launch_year='+requestYear)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // To remove - just to ensure correct data is being retrieved
            console.log(data);

            var i;
            // Get Table object from HTML page
            var table = document.getElementById("launchTable");

            // Cycle through Launches an add rows to table
            for (i = 0; i < data.length; i++) {

                var row = table.insertRow(1+i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                // If the nextFlightNumber matches the current flight number we know
                // that this is the next flight.  
                // A class is added to the row which will highlight it
                if (nextFlightNumber == data[i].flight_number) {
                  row.className = 'next_flight';
                }

                // Display a better time and date.
                var timeArray = data[i].launch_date_utc.split("T");

                cell1.innerHTML = '<p>' + data[i].flight_number + "</p>";
              
                // 'Replace added to force the HTML to use none-breaking hyphens.  Before this they'd wrap in an ugly way
                cell2.innerHTML = '<p>' + timeArray[0].replace(/-/g,'&#8209;') + "</p>";
                cell3.innerHTML = '<p>' + data[i].mission_name + "</p>";
                if (data[i].details != null) {
                  // If there are details on the flight show them below
                  cell3.innerHTML += '<p class="subtext">' + data[i].details + "</p>";
                }
                cell4.innerHTML = "<p>" + data[i].rocket.rocket_name + "</p>";
            }

        });
});

