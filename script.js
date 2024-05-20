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
            "#440505", //Dark Red
            "#D50000", //Bright Red
            "#FF5722", //Tangerine
            "#FA9600", //Saffron
            "#FFDE20", //Sunshine Yellow
            "#96CA2D", //Lime Green
            "#33691E", //Forest Green
            "#0067A6", //Deep sky blue
            "#002253", //Dark blue
            "#4C1273", //Deep purple
            "#AB47BC", //Lavender
          ],
          hoverBackgroundColor: [
            "rgba(68, 5, 5, 0.8)", //Dark Red
            "rgba(213, 0, 0, 0.8)", //Bright Red
            "rgba(255, 87, 34, 0.8)", //Tangerine
            "rgba(250, 150, 0, 0.8)", //Saffron
            "rgba(255, 222, 32, 0.8)", //Sunshine Yellow
            "rgba(150, 202, 45, 0.8)", //Lime Green
            "rgba(51, 105, 30, 0.8)", //Forest Green
            "rgba(0, 103, 166, 0.8)", //Deep Sky Blue
            "rgba(0, 34, 83, 0.8)", //Dark blue
            "rgba(76, 18, 115, 0.8)", //Deep purple
            "rgba(171, 71, 188, 0.8)", //Lavender
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
            text: "Utsläpp mellan olika transporter",
            align: 'center', 
            font: {
              size: 24,
             
            }
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
      "2022"
      
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
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
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

  // LINJEDIAGRAM

  function printLineCharts(utslappData) {
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

    const chartConfigurations = [
      {
        title: "Utsläpp av inrikes flyg",
        filter: "8.1.2",
        elementId: "inflygChart",
        label: "Utsläpp av inrikes flyg",
        borderColor: "rgba(182, 182, 182, 1)", //Gray
      },
      {
        title: "Utsläpp av utrikes flyg",
        filter: "8.1.3",
        elementId: "utflygChart",
        label: "Utsläpp av utrikes flyg",
        borderColor: "rgba(64, 83, 27, 1)", //Dark Olive Green
      },
      {
        title: "Utsläpp av järnväg",
        filter: "8.2.1",
        elementId: "jarnvagChart",
        label: "Järnväg",
        borderColor: "rgba(57, 90, 119, 1)", //Steel Blue
      },
      {
        title: "Privata fritidsbåtar",
        filter: "8.4.1",
        elementId: "privbatChart",
        label: "Privata fritidsbåtar",
        borderColor: "rgba(85, 111, 68, 1)", //Olive Drab
      },
      {
        title: "Kommersiella fartyg",
        filter: "8.4.2",
        elementId: "fartygChart",
        label: "Kommersiella fartyg",
        borderColor: "rgba(69, 105, 144, 1)", //Slate Blue
      },
      {
        title: "Personbilar",
        filter: "8.5.1",
        elementId: "bilChart",
        label: "Personbilar",
        borderColor: "rgba(52, 63, 27, 1)", //Army Green
      },
      {
        title: "A-traktorer",
        filter: "8.5.11",
        elementId: "achart",
        label: "A-traktorer",
        borderColor: "rgba(115, 193, 198, 1)", //Light Blue
      },
      {
        title: "Bussar",
        filter: "8.5.2",
        elementId: "busschart",
        label: "Bussar",
        borderColor: "rgba(117, 149, 69, 1)", //Olive Green
      },
      {
        title: "Lätta lastbilar",
        filter: "8.5.3",
        elementId: "llastchart",
        label: "Lätta lastbilar",
        borderColor: "rgba(79, 79, 78, 1)", // Charcoal
      },
      {
        title: "Mopeder och motorcyklar",
        filter: "8.5.4",
        elementId: "mopedchart",
        label: "Mopeder och motorcyklar",
        borderColor: "rgba(46, 71, 89, 1)", //Dark Slate Blue
      },
      {
        title: "Tunga lastbilar",
        filter: "8.5.7",
        elementId: "tlastchart",
        label: "Tunga lastbilar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ];

    chartConfigurations.forEach((config) => {
      const filteredData = utslappData.filter(
        (item) => item.key[1] === config.filter
      );

      const emissions = filteredData.map((item) => parseFloat(item.values[0]));

      const validEmissions = [];
      emissions.forEach((emission, index) => {
        if (index < years.length) {
          validEmissions.push(emission);
        }
      });

      console.log(validEmissions);

      const totalEmissions = validEmissions.reduce(
        (total, emission) => total + emission,
        0
      );
      console.log(`Total emissions for ${config.title}:`, totalEmissions);
      console.log(`Emissions array for ${config.title}:`, validEmissions);

      new Chart(document.getElementById(config.elementId), {
        type: "line",
        data: {
          labels: years,
          datasets: [
            {
              label: config.label,
              data: validEmissions,
              fill: false,
              borderColor: "#ACE1AF",
              borderWidth: 3,
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
              text: config.title,
              font: {
                size: 24,
              },
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
            x: {
              min: 2000,
              max: 2023,
              type: "linear",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Year",
              },
            },
            y: {
              min: -10000,
              max: 60000,
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
      "#FFF9C4",

      "#FFCCBC",

      "#DCEDC8",

      "#BBDEFB",

      "#E1BEE7",

      "#FFF59D",

      "#FFAB91",

      "#C8E6C9",

      "#B3E5FC",

      "#E1BEE7",

      "#FFE082",
    ];

    new Chart(document.getElementById("combinedChart"), {
      type: "line",

      data: {
        labels: years,

        datasets: chartData.map((dataset, index) => ({
          ...dataset,

          borderColor: backgroundColor[index % backgroundColor.length], // Ensure cycling through colors
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
      printLineCharts(dataUtslapp.data);

      const totalEmissionsPerYear = calculateTotalEmissionsPerYear(
        dataUtslapp.data
      );
      displayTotalEmissionsBarChart(totalEmissionsPerYear);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// TEST FÖR TABS

const tabButtons = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".content");

function deactivateAllTabs() {
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });
  contents.forEach((content) => {
    content.classList.remove("active");
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const id = button.dataset.id;
    deactivateAllTabs();
    button.classList.add("active");
    const content = document.getElementById(id);
    content.classList.add("active");

    const canvas = content.querySelector("canvas");
    console.log(canvas);
    if (canvas) {
      initializeChart(canvas.id);
      console.log(initializeChart);
    }
  });
});

// SCROLL / READ MORE

document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.getElementById("scrollbtn");
  if (scrollButton) {
    scrollButton.addEventListener("click", () => {
      const scrollTargetSection = document.getElementById(
        "scrollTargetSection"
      );
      if (scrollTargetSection) {
        scrollTargetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tab-button");
  const buttonWrapper = document.querySelector(".buttonWrapper");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetButton = button.getAttribute("data-id");
      const targetElement = document.getElementById(targetButton);
      if (targetElement) {
        const scrollLeft = targetElement.offsetLeft - buttonWrapper.offsetLeft;
        buttonWrapper.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    });
  });
});

// TEST FÖR CARDS
