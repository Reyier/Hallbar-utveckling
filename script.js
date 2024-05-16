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
            " #FFF9C4 ",
            "#FFCCBC  ",
            "#DCEDC8  ",
            "#BBDEFB ",
            "#E1BEE7 ",
            "#FFF59D ",
            "#FFAB91  ",
            "#C8E6C9 ",
            "#B3E5FC ",
            "#E1BEE7  ",
            "#FFE082 "
          ],
          hoverBackgroundColor: [
            "rgba(255, 193, 7, 0.8)",
            "rgba(255, 87, 34, 0.8)",
            "rgba(76, 175, 80, 0.8)",
            "rgba(33, 150, 243, 0.8)",
            "rgba(156, 39, 176, 0.8)",
            "rgba(255, 235, 59, 0.8)",
            "rgba(255, 152, 0, 0.8)",
            "rgba(139, 195, 74, 0.8)",
            "rgba(3, 169, 244, 0.8)",
            "rgba(103, 58, 183, 0.8)",
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
            display: false,
            text: "Emissions by Transport Mode in 2022",
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
      },
      
    });
  }










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
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Utsläpp av utrikes flyg",
        filter: "8.1.3",
        elementId: "utflygChart",
        label: "Utsläpp av utrikes flyg",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Utsläpp av järnväg",
        filter: "8.2.1",
        elementId: "jarnvagChart",
        label: "Järnväg",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Privata fritidsbåtar",
        filter: "8.4.1",
        elementId: "privbatChart",
        label: "Privata fritidsbåtar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Kommersiella fartyg",
        filter: "8.4.2",
        elementId: "fartygChart",
        label: "Kommersiella fartyg",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Personbilar",
        filter: "8.5.1",
        elementId: "bilChart",
        label: "Personbilar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "A-traktorer",
        filter: "8.5.11",
        elementId: "achart",
        label: "A-traktorer",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Bussar",
        filter: "8.5.2",
        elementId: "busschart",
        label: "Bussar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Lätta lastbilar",
        filter: "8.5.3",
        elementId: "llastchart",
        label: "Lätta lastbilar",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        title: "Mopeder och motorcyklar",
        filter: "8.5.4",
        elementId: "mopedchart",
        label: "Mopeder och motorcyklar",
        borderColor: "rgba(255, 99, 132, 1)",
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




  

  const requestUtslapp = new Request(urlUtslapp, {
    method: "POST",
    body: JSON.stringify(queryUtslapp),
  });

  fetch(requestUtslapp)
    .then((response) => response.json())
    .then((dataUtslapp) => {
      printDoughnutChart(dataUtslapp.data);
      printLineCharts(dataUtslapp.data);
      
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
    console.log(canvas)
    if (canvas) {
      initializeChart(canvas.id);
      console.log(initializeChart)
    }
  });
});





// SCROLL / READ MORE


document.addEventListener('DOMContentLoaded', () => {
  const scrollButton = document.getElementById('scrollbtn');
  if (scrollButton) {
    scrollButton.addEventListener('click', () => {
      const scrollTargetSection = document.getElementById('scrollTargetSection');
      if (scrollTargetSection) {
        scrollTargetSection.scrollIntoView({ behavior: 'smooth' });
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



// //Test för cards

// // Funktion för att skriva ut donut-diagrammet i ett kort
// function printDoughnutChartInCard(utslappData, chartId) {
//   const year = "2021";
//   const transportModeNames = {
//     "8.1.2": "Inrikes flyg",
//     "8.1.3": "Utrikes flyg",
//     "8.2.1": "Järnväg",
//     "8.4.1": "Privata fritidsbåtar",
//     "8.4.2": "Kommersiella fartyg",
//     "8.5.1": "Personbilar",
//     "8.5.11": "A-traktorer",
//     "8.5.2": "Bussar",
//     "8.5.3": "Lätta lastbilar",
//     "8.5.4": "Mopeder och motorcyklar",
//     "8.5.7": "Tunga lastbilar",
//   };

//   const aggregatedEmissions = Object.keys(transportModeNames).reduce(
//     (acc, transportMode) => {
//       const filteredData = utslappData.filter(
//         (item) => item.key[1] === transportMode && item.key[3] === year
//       );

//       const emissionValue =
//         filteredData.length > 0 ? parseFloat(filteredData[0].values[0]) : 0;

//       acc[transportModeNames[transportMode]] = emissionValue;

//       return acc;
//     },
//     {}
//   );

//   const labels = Object.keys(aggregatedEmissions);
//   const data = Object.values(aggregatedEmissions);

//   renderDoughnutChartInCard(labels, data, chartId);
// }

// // Funktion för att rendera donut-diagrammet i ett kort
// function renderDoughnutChartInCard(labels, data, chartId) {
//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         data: data,
//         backgroundColor: [
//           " #FFF9C4 ",
//           "#FFCCBC  ",
//           "#DCEDC8  ",
//           "#BBDEFB ",
//           "#E1BEE7 ",
//           "#FFF59D ",
//           "#FFAB91  ",
//           "#C8E6C9 ",
//           "#B3E5FC ",
//           "#E1BEE7  ",
//           "#FFE082 "
//         ],
//         hoverBackgroundColor: [
//           "rgba(255, 193, 7, 0.8)",
//           "rgba(255, 87, 34, 0.8)",
//           "rgba(76, 175, 80, 0.8)",
//           "rgba(33, 150, 243, 0.8)",
//           "rgba(156, 39, 176, 0.8)",
//           "rgba(255, 235, 59, 0.8)",
//           "rgba(255, 152, 0, 0.8)",
//           "rgba(139, 195, 74, 0.8)",
//           "rgba(3, 169, 244, 0.8)",
//           "rgba(103, 58, 183, 0.8)",
//         ],

//         borderWidth: 1,
//       },
//     ],
//   };

//   const ctx = document.getElementById(chartId).getContext("2d");
//   new Chart(ctx, {
//     type: "doughnut",
//     data: chartData,
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//     },
//   });
// }

// // Skriv ut donut-diagram för år 2022 i det första kortet
// printDoughnutChartInCard(utslappData, "chart2022");

// // Skriv ut donut-diagram för år 2021 i det andra kortet
// printDoughnutChartInCard(utslappData, "chart2021");

// // Skriv ut donut-diagram för år 2020 i det tredje kortet
// printDoughnutChartInCard(utslappData, "chart2020");
