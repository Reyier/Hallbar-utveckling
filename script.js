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
        code: "ContentsCode",
        selection: { filter: "item", values: ["000006W2"] },
      },
    ],
    response: { format: "json" },
  };

  function printDoughnutChart(utslappData) {
    const year = "2022";
    const transportModeNames = {
      "8.1.2": "Inrikes flyg",
      "8.1.3": "Utrikes flyg",
      "8.2.1": "Järnväg",
      "8.4.1": "Privata fritidsbåtar",
      "8.4.2": "Kommersiella fartyg",
      "8.5.1": "Personbilar",
      "8.5.11": "A-traktorer",
      "8.5.2": "Bussar",
      "8.5.3": "Lätta lastbilar",
      "8.5.4": "Mopeder och motorcyklar",
      "8.5.7": "Tunga lastbilar",
    };

    const aggregatedEmissions = Object.keys(transportModeNames).reduce(
      (acc, transportMode) => {
        const filteredData = utslappData.filter(
          (item) => item.key[1] === transportMode && item.key[3] === year
        );

        const emissionValue =
          filteredData.length > 0 ? parseFloat(filteredData[0].values[0]) : 0;

        acc[transportModeNames[transportMode]] = emissionValue;

        return acc;
      },
      {}
    );

    const labels = Object.keys(aggregatedEmissions);
    const data = Object.values(aggregatedEmissions);

    renderDoughnutChart(labels, data);
  }

  function renderDoughnutChart(labels, data) {
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            
            "#A3C4F3", // Pastel Blue
            "#CBC3E3", // Lavender Blue
            "#B2DFFB", // Baby Blue
            "#DCD0FF", // Pale Lavender
            "#CCCCFF", // Periwinkle
            "#ADD8E6", // Light Blue
            "#E0B0FF", // Mauve
            "#87CEEB", // Sky Blue
            "#B0C4DE", // Light Steel Blue
            "#D8BFD8", // Thistle
            "#C5CBE1", // Light Periwinkle

          ],
          hoverBackgroundColor: [
            "rgba(163, 196, 243, 0.8)", // Pastel Blue
            "rgba(203, 195, 227, 0.8)", // Lavender Blue
            "rgba(178, 223, 251, 0.8)", // Baby Blue
            "rgba(216, 191, 216, 0.8)", // Thistle
            "rgba(204, 204, 255, 0.8)", // Periwinkle
            "rgba(173, 216, 230, 0.8)", // Light Blue
            "rgba(224, 176, 255, 0.8)", // Mauve
            "rgba(135, 206, 235, 0.8)", // Sky Blue
            "rgba(176, 196, 222, 0.8)", // Light Steel Blue
            "rgba(220, 208, 255, 0.8)", // Pale Lavender
            "rgba(197, 203, 225, 0.8)", // Light Periwinkle

          ],

          borderWidth: 1,
        },
      ],
    };

    const totalEmission = data.reduce((total, emission) => total + emission, 0);
    console.log("Total Emission:", totalEmission);

    new Chart(document.getElementById("doughnutChart"), {
      type: "doughnut",
      data: chartData,
      options: {
        aspectRatio: 1,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "none",
          },
          title: {
            display: true,
            text: "Utsläpp mellan olika transporter 2022",
            align: "center",
            font: {
              size: 24,
              weight: "bold",
            },
            color: "#211951",
          },
          tooltip: {
            bodySpacing: 10,
            padding: 15,
            bodyFont: {
              size: 16,
            },
            titleFont: {
              size: 18,
            },
          },
        },
      },
    });
  }

  // CARDS

  function calculateTotalEmissionsPerYear(data) {
    const yearTotals = {};
    const validTransportModes = {
      "8.1.2": "Inrikes flyg",
      "8.1.3": "Utrikes flyg",
      "8.2.1": "Järnväg",
      "8.4.1": "Privata fritidsbåtar",
      "8.4.2": "Kommersiella fartyg",
      "8.5.1": "Personbilar",
      "8.5.11": "A-traktorer",
      "8.5.2": "Bussar",
      "8.5.3": "Lätta lastbilar",
      "8.5.4": "Mopeder och motorcyklar",
      "8.5.7": "Tunga lastbilar",
    };

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

    years.forEach((year) => {
      yearTotals[year] = {};

      for (const transportMode in validTransportModes) {
        const filteredData = data.filter(
          (item) => item.key[1] === transportMode && item.key[3] === year
        );

        console.log(
          "Filtered data for",
          year,
          validTransportModes[transportMode],
          filteredData
        );

        const emission =
          filteredData.length > 0 ? parseFloat(filteredData[0].values[0]) : 0;

        console.log(
          "Emission for",
          year,
          validTransportModes[transportMode],
          emission
        );

        yearTotals[year][validTransportModes[transportMode]] = emission;
      }
    });

    console.log("Total emissions per year:", yearTotals); // Log the total emissions per year
    return yearTotals;
  }

  function displayTotalEmissionsBarChart(yearTotals) {
    const years = Object.keys(yearTotals);
    const totalEmissionsData = years.map((year) => {
      const totalEmission = Object.values(yearTotals[year]).reduce(
        (acc, emission) => acc + emission,
        0
      );
      return totalEmission;
    });
    
    const ctx = document.getElementById("emissionBarChart").getContext("2d");
    console.log(ctx);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: years,
        datasets: [
          {
            data: totalEmissionsData,
            backgroundColor: "#ADD8E6", //Light Blue
            borderColor: "#C5CBE1",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "none",
          },
          title: {
            display: true,
            text: "Totala utsläpp kväveoxid per år",

            font: {
              size: 24,
              weight: "bold",
            },
            color: "#211951",
          },
          tooltip: {
            bodySpacing: 10,
            padding: 15,
            bodyFont: {
              size: 16,
            },
            titleFont: {
              size: 18,
            },
          },
        },

        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: false,
              text: "Totala utsläpp",
            },
          },
          x: {
            title: {
              display: false,
              text: "Year",
            },
          },
        },
      },
    });
  }

  // KOMBINERAT LINJEDIAGRAM

  function printcombinedCharts(utslappData) {
    const years = Array.from({ length: 23 }, (_, i) => 2000 + i);

    const chartData = [];

    const chartConfigurations = [
      {
        title: "Utsläpp av inrikes flyg",

        filter: "8.1.2",

        label: "Utsläpp av inrikes flyg",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Utsläpp av utrikes flyg",

        filter: "8.1.3",

        label: "Utsläpp av utrikes flyg",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Utsläpp av järnväg",

        filter: "8.2.1",

        label: "Järnväg",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Privata fritidsbåtar",

        filter: "8.4.1",

        label: "Privata fritidsbåtar",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Kommersiella fartyg",

        filter: "8.4.2",

        label: "Kommersiella fartyg",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Personbilar",

        filter: "8.5.1",

        label: "Personbilar",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "A-traktorer",

        filter: "8.5.11",

        label: "A-traktorer",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Bussar",

        filter: "8.5.2",

        label: "Bussar",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Lätta lastbilar",

        filter: "8.5.3",

        label: "Lätta lastbilar",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Mopeder och motorcyklar",

        filter: "8.5.4",

        label: "Mopeder och motorcyklar",

        borderColor: "rgba(255, 99, 132, 1)",
      },

      {
        title: "Tunga lastbilar",

        filter: "8.5.7",

        label: "Tunga lastbilar",

        borderColor: "rgba(255, 99, 132, 1)",
      },
    ];

    chartConfigurations.forEach((config) => {
      const filteredData = utslappData.filter(
        (item) => item.key[1] === config.filter
      );

      const emissions = filteredData.map((item) => parseFloat(item.values[0]));

      const validEmissions = emissions.slice(0, years.length);

      const totalEmissions = validEmissions.reduce(
        (total, emission) => total + emission,
        0
      );

      console.log(`Total emissions for ${config.title}:`, totalEmissions);

      chartData.push({
        label: config.label,

        data: validEmissions,

        borderColor: config.borderColor,

        borderWidth: 3,
      });
    });

    const backgroundColor = [
      
      "#A3C4F3", // Pastel Blue
      "#CBC3E3", // Lavender Blue
      "#B2DFFB", // Baby Blue
      "#DCD0FF", // Pale Lavender
      "#CCCCFF", // Periwinkle
      "#ADD8E6", // Light Blue
      "#E0B0FF", // Mauve
      "#87CEEB", // Sky Blue
      "#B0C4DE", // Light Steel Blue
      "#D8BFD8", // Thistle
      "#C5CBE1", // Light Periwinkle
      
    ];

    new Chart(document.getElementById("combinedChart"), {
      type: "line",

      data: {
        labels: years,

        datasets: chartData.map((dataset, index) => ({
          ...dataset,

          borderColor: backgroundColor[index % backgroundColor.length],
          borderWidth: 2,

          backgroundColor: backgroundColor[index % backgroundColor.length],
        })),
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            display: true,
            position: "top",

            labels: {
              font: {
                size: 14,
              },
            },
          },

          title: {
            display: true,

            text: "Utforska olika transportmedel och deras utsläpp under 2000-talet",

            font: {
              size: 24,

              weight: "bold",
            },
            color: "#211951",
          },

          tooltip: {
            bodySpacing: 10,

            padding: 15,

            bodyFont: {
              size: 16,
            },

            titleFont: {
              size: 18,

              weight: "bold",
            },
          },
        },

        scales: {
          x: {
            min: 2000,

            max: 2023,

            type: "linear",

            display: true,

            grid: {
              display: true,

              color: "rgba(0, 0, 0, 0.1)",
            },

            scaleLabel: {
              display: true,

              labelString: "Year",

              font: {
                size: 16,

                weight: "bold",
              },
            },

            ticks: {
              font: {
                size: 14,
              },
            },
          },

          y: {
            min: 0,

            display: true,

            grid: {
              display: true,

              color: "rgba(0, 0, 0, 0.1)",
            },

            scaleLabel: {
              display: true,

              labelString: "NOx Emissions",

              font: {
                size: 16,

                weight: "bold",
              },
            },

            ticks: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  }

  const requestUtslapp = new Request(urlUtslapp, {
    method: "POST",
    body: JSON.stringify(queryUtslapp),
  });

  fetch(requestUtslapp)
    .then((response) => response.json())
    .then((dataUtslapp) => {
      printDoughnutChart(dataUtslapp.data);
      printcombinedCharts(dataUtslapp.data);

      const totalEmissionsPerYear = calculateTotalEmissionsPerYear(
        dataUtslapp.data
      );
      displayTotalEmissionsBarChart(totalEmissionsPerYear);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
