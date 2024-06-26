window.onload = function () {

// API

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




  // DOUGNUT DIAGRAM

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
            
            "#A3C4F3", 
            "#CBC3E3", 
            "#B2DFFB", 
            "#DCD0FF",
            "#CCCCFF", 
            "#ADD8E6",
            "#E0B0FF", 
            "#87CEEB", 
            "#B0C4DE", 
            "#D8BFD8", 
            "#C5CBE1", 

          ],
          hoverBackgroundColor: [
            "#8393C1", 
            "#A9A2B1", 
            "#91AFC7", 
            "#B89EA6", 
            "#ABABCB", 
            "#8CA9B2", 
            "#C08FCD", 
            "#659EB7", 
            "#8F94AA", 
            "#BB9FCD", 
            "#A59AAD"
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
            text: "Utsläpp mellan olika transporter i ton under 2022",
            align: "center",
            font: {
              family:"'stolzl', sans-serif",
              size: 24,
              weight: "500",
            },
            padding: {
              bottom: 20 
          },
            color: "#333",
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










  
  // TOTALA UTSLÄPP PER ÅR, STAPEL DIAGRAM

  function calculateTotalEmission(data) {
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

    console.log("Total emissions per year:", yearTotals); 
    return yearTotals;
  }







  function displayTotalEmission(yearTotals) {
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
            backgroundColor: "#ADD8E6", 
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
            text: "Totala utsläpp kväveoxid per år i ton",

            font: {
              family:"'stolzl', sans-serif",
              size: 24,
              weight: "500",
            },
            padding: {
              bottom: 20 
          },
            color: "#333",
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
      
      "#A3C4F3", 
      "#CBC3E3", 
      "#B2DFFB",
      "#DCD0FF", 
      "#CCCCFF", 
      "#ADD8E6",
      "#E0B0FF", 
      "#87CEEB", 
      "#B0C4DE", 
      "#D8BFD8", 
      "#C5CBE1", 
      
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
                family: "'stolzl', sans-serif",
                size: 14,
              },
            },
          },

          title: {
            display: true,

            text: "Utforska olika transportmedel och deras utsläpp under 2000-talet i ton",

            font: {
              family:"'stolzl', sans-serif",
              size: 24,
              weight: "500",
            },
            padding: {
              bottom: 20,
          },
            color: "#333",
          },

          tooltip: {
            bodySpacing: 10,

            padding: 15,

            bodyFont: {
              size: 16,
            },

            titleFont: {
              family:"'stolzl', sans-serif",
              size: 18,
              weight: "500",
            },
          },
        },

        scales: {
          x: {
            min: 2000,

            max: 2023,

            

            display: true,
            
            grid: {
              display: true,

              color: "rgba(0, 0, 0, 0.1)",
            },

        

            ticks: {
              font: {
                family: "'stolzl', sans-serif",
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
                family: "'stolzl', sans-serif",
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

      const totalEmissionsPerYear = calculateTotalEmission(
        dataUtslapp.data
      );
      displayTotalEmission(totalEmissionsPerYear);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};





// SCROLL

document.querySelectorAll('.learn-more-btn').forEach(button => {
  button.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});









// MODAL
var modal = document.getElementById("canvasModal");
var span = document.getElementsByClassName("close")[0];
var modalCanvas = document.getElementById("modalCanvas");
var modalTextContent = document.getElementById("modalTextContent");
var modalChart;

function openModal(canvasId, chartType) {
  console.log("Opening modal with canvas ID:", canvasId);
  console.log("Chart type:", chartType); 

  var originalCanvas = document.getElementById(canvasId);

  if (originalCanvas) {
    var originalCtx = originalCanvas.getContext('2d');
    var originalChart = Chart.getChart(originalCtx);

    if (originalChart) {
      modal.style.display = "block";
      modalCanvas.style.display = "block";
      modalTextContent.style.display = "none";
      modalTextContent.classList.remove("active");

      modalCanvas.width = originalCanvas.width;
      modalCanvas.height = originalCanvas.height;

      if (modalChart) {
        modalChart.destroy();
      }

      if (chartType === 'doughnut') {
        var doughnutOptions = Object.assign({}, originalChart.config.options, {
          plugins: {
            legend: {
              display: true,
              position: 'top',
              
              labels: {
                font: {
                    size: 16 // Adjust the font size here
                }
            }
            },
            title: {
              display: true,
              text: "Utsläpp mellan olika transporter i ton under 2022",
              align: "center",
              font: {
                family:"'stolzl', sans-serif",
                size: 24,
                weight: "500",
              },
              padding: {
                bottom: 20 
            },
              color: "#333",
            },
          }
        });

        modalChart = new Chart(modalCanvas, {
          type: originalChart.config.type,
          data: originalChart.config.data,
          options: doughnutOptions
        });

      } else {
        modalChart = new Chart(modalCanvas, {
          type: originalChart.config.type,
          data: originalChart.config.data,
          options: originalChart.config.options
        });
      }
    }
  }
}







function openModalWithContent(contentClass) {
  console.log("Opening modal with content class:", contentClass);
  var contents = document.getElementsByClassName(contentClass);
  console.log("Found contents:", contents);

  if (contents.length > 0) {
    var combinedContent = Array.from(contents).map(p => p.innerHTML).join('');
    console.log("Combined content:", combinedContent);

    modal.style.display = "block";
    modalCanvas.style.display = "none"; 
    modalTextContent.style.display = "flex"; 
    modalTextContent.classList.add("active");
    modalTextContent.innerHTML = combinedContent; 
  }
}

document.querySelectorAll('.grid-item').forEach(item => {
  var target = item.getAttribute('data-target');
  var chartType = item.getAttribute('data-chart-type'); 
  if (target) {
    item.addEventListener('click', function() {
      openModal(target, chartType); 
    });
  }
});

document.querySelectorAll('.learn-more-btn').forEach(btn => {
  var targetId = btn.getAttribute('data-additional-text');
  if (targetId) {
    btn.addEventListener('click', function() {
      openModalWithContent(targetId);
    });
  }
});

span.onclick = function() {
  modal.style.display = "none";
  modalCanvas.style.display = "none"; 
  modalTextContent.style.display = "none";
  modalTextContent.classList.remove("active");
  if (modalChart) {
    modalChart.destroy();
    modalChart = null;
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalCanvas.style.display = "none"; 
    modalTextContent.style.display = "none"; 
    modalTextContent.classList.remove("active");
    if (modalChart) {
      modalChart.destroy();
      modalChart = null;
    }
  }
}



