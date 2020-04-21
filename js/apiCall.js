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

                cell1.innerHTML = '<p>' + data[i].flight_number + "</p>";
                cell2.innerHTML = '<p>' + data[i].launch_date_utc + "</p>";
                cell3.innerHTML = "<p>" + data[i].mission_name + "</p>";
                cell4.innerHTML = "<p>" + data[i].rocket.rocket_name + "</p>";
            }

        });
});