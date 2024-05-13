window.onload = function () {
  const urlUtslapp =
    "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0108/MI0108InTranspN2";

  const queryUtslapp = {
    query: [
      {
        code: "Transportslag",
        selection: {
          filter: "item",
          values: [
            "8.1.2",
            "8.1.3",
            "8.2.1",
            "8.4.1",
            "8.4.2",
            "8.5.1",
            "8.5.11",
            "8.5.2",
            "8.5.3",
            "8.5.4",
            "8.5.7",
            "8.5.9",
            "8.5.8",
            "8.5.10",
          ],
        },
        valueTexts: [
          "Inrikes flyg",
          "Utrikes flyg",
          "Järnväg",
          "Privata fritidsbåtar",
          "Kommersiella fartyg",
          "Personbilar",
          "A-traktorer",
          "Bussar",
          "Lätta lastbilar",
          "Mopeder och motorcyklar",
          "Tunga lastbilar",
          "Partiklar från däck och bromsar",
          "Bensinavdunstning",
          "Partiklar från vägslitage",
        ],
      },
      {
        code: "Luftfororening",
        selection: { filter: "item", values: ["NOx"] },
      },
      {
        code: "Tid",
        selection: {
          filter: "item",
          values: [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
          ],
        },
      },
      {
        code: "Bransleslag",
        selection: {
          filter: "item",
          values: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "16",
            "13",
            "14",
            "15",
            "17",
            "18",
          ],
        },
      },
      {
        code: "ContentsCode",
        selection: { filter: "item", values: ["000006W2"] },
      },
    ],
    response: { format: "json" },
  };

  function printUtslappChart(utslappData) {
    // Extracting data from the response
    const data = utslappData.map((item) => ({
      pollutant: item.key[0],
      transportMode: item.key[1],
      fuelType: item.key[2],
      year: item.key[3],
      emission: parseFloat(item.values[0]), // Convert emission value to float
    }));

    // Filtering data for the year 2022 and pollutant NOx
    const filteredData = data.filter(
      (item) => item.pollutant === "NOx" && item.year === "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022"
    );

    // Grouping transport modes and summing corresponding emissions
    const transportModes = {};
    filteredData.forEach((item) => {
      if (item.transportMode.startsWith("8.1") && item.emission > 0) {
        if (
          item.transportMode.startsWith("8.1.2") ||
          item.transportMode.startsWith("8.1.3")
        ) {
          transportModes[item.transportMode] =
            (transportModes[item.transportMode] || 0) + item.emission;
        } else {
          transportModes["8.1"] = (transportModes["8.1"] || 0) + item.emission;
        }
      } else if (item.transportMode.startsWith("8.2") && item.emission > 0) {
        if (item.transportMode.startsWith("8.2.1")) {
          transportModes[item.transportMode] =
            (transportModes[item.transportMode] || 0) + item.emission;
        } else {
          transportModes["8.2"] = (transportModes["8.2"] || 0) + item.emission;
        }
      } else if (item.transportMode.startsWith("8.4") && item.emission > 0) {
        if (
          item.transportMode.startsWith("8.4.1") ||
          item.transportMode.startsWith("8.4.2")
        ) {
          transportModes[item.transportMode] =
            (transportModes[item.transportMode] || 0) + item.emission;
        } else {
          transportModes["8.4"] = (transportModes["8.4"] || 0) + item.emission;
        }
      } else if (item.transportMode.startsWith("8.5") && item.emission > 0) {
        if (
          item.transportMode.startsWith("8.5.1") ||
          item.transportMode.startsWith("8.5.11") ||
          item.transportMode.startsWith("8.5.2") ||
          item.transportMode.startsWith("8.5.3") ||
          item.transportMode.startsWith("8.5.4") ||
          item.transportMode.startsWith("8.5.7") ||
          item.transportMode.startsWith("8.5.9") ||
          item.transportMode.startsWith("8.5.8") ||
          item.transportMode.startsWith("8.5.10")
        ) {
          transportModes[item.transportMode] =
            (transportModes[item.transportMode] || 0) + item.emission;
        } else {
          transportModes["8.5"] = (transportModes["8.5"] || 0) + item.emission;
        }
      } else if (item.emission > 0) {
        transportModes[item.transportMode] =
          (transportModes[item.transportMode] || 0) + item.emission;
      }
    });
    const label = [
      "Inrikes flyg (<1000 m.)",
      "Utrikes flyg (<1000 m.)",
      "Järnväg ",
      "Privata fritidsbåtar ",
      "Kommersiella fartyg ",
      "Personbilar ",
      "A-traktorer ",
      "Bussar ",
      "Lätta lastbilar ",
      "Mopeder och motorcyklar ",
      "Tunga lastbilar ",
    ];
    const color = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      "rgba(255, 0, 0, 0.6)",
      "rgba(0, 255, 0, 0.6)",
      "rgba(0, 0, 255, 0.6)",
      "rgba(255, 255, 0, 0.6)",
      "rgba(0, 128, 128, 0.6)",
    ];
    console.log(transportModes);
    console.log(filteredData);
    // Creating the pie chart

    new Chart(document.getElementById("pieChart"), {
      type: "pie",
      data: {
        labels: label,
        datasets: [
          {
            label: "Kväveoxid utsläpp för olika transportslag sedan 2000",
            data: Object.values(transportModes),
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Kväveoxid transportslag i olika sektorer sedan 2000",
          },
        },
      },
    });
  }

  function printLineCharts(utslappData) {
    // Extract relevant information for chart
    const years = [
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
    ];

    // Define configurations for both charts
    const chartConfigurations = [
      {
        title: "Utsläpp av inrikes flyg (8.1.2)",
        filter: "8.1.2",
        elementId: "inflygChart",
        label: "Utsläpp av inrikes flyg",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Utsläpp av utrikes flyg (8.1.3)",
        filter: "8.1.3",
        elementId: "utflygChart",
        label: "Utsläpp av utrikes flyg",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Utsläpp av järnväg (8.1.2)",
        filter: "8.2.1",
        elementId: "jarnvagChart",
        label: "Järnväg",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Privata fritidsbåtar (8.4.1)",
        filter: "8.4.1",
        elementId: "privbatChart",
        label: "Privata fritidsbåtar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Kommersiella fartyg (8.4.2)",
        filter: "8.4.2",
        elementId: "fartygChart",
        label: "Kommersiella fartyg",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Personbilar(8.5.1)",
        filter: "8.5.1",
        elementId: "bilChart",
        label: "Personbilar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "A-traktorer(8.5.11)",
        filter: "8.5.11",
        elementId: "achart",
        label: "A-traktorer",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Bussar(8.5.2)",
        filter: "8.5.2",
        elementId: "busschart",
        label: "Bussar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Lätta lastbilar(8.5.3)",
        filter: "8.5.3",
        elementId: "llastchart",
        label: "Lätta lastbilar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Mopeder och motorcyklar(8.5.4)",
        filter: "8.5.4",
        elementId: "mopedchart",
        label: "Mopeder och motorcyklar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Tunga lastbilar(8.5.7)",
        filter: "8.5.7",
        elementId: "tlastchart",
        label: "Tunga lastbilar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ];

    // Loop through chart configurations and create charts
    chartConfigurations.forEach((config) => {
      // Filter data for the specific transport mode
      const filteredData = utslappData.filter(
        (item) => item.key[1] === config.filter
      );

      // Extract emissions for the filtered data
      const emissions = filteredData.map((item) => parseFloat(item.values[0]));

      // Create the line chart
      new Chart(document.getElementById(config.elementId), {
        type: "line",
        data: {
          labels: years,
          datasets: [
            {
              label: config.label,
              data: emissions,
              fill: false,
              borderColor: config.borderColor,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: config.title,
            },
          },
          scales: {
            x: {
              type: "linear",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Year",
              },
            },
            y: {
              beginAtZero: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: "NOx Emissions",
              },
            },
          },
        },
      });
    });
  }

  const requestUtslapp = new Request(urlUtslapp, {
    method: "POST",
    body: JSON.stringify(queryUtslapp),
  });

  // Fetching data from the API
  fetch(requestUtslapp)
    .then((response) => response.json())
    .then((dataUtslapp) => {
      printUtslappChart(dataUtslapp.data);
      printLineCharts(dataUtslapp.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
