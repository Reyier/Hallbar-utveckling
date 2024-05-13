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
    const data = utslappData.map((item) => ({
      pollutant: item.key[0],
      transportMode: item.key[1],
      fuelType: item.key[2],
      year: item.key[3],
      emission: parseFloat(item.values[0]),
    }));

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
        aspectRatio: 1,
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 20,
              },
            },
          },
          title: {
            display: true,
            text: "Kväveoxid transportslag i olika sektorer sedan 2000",
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
              max: 2023,
              type: "linear",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Year",
              },
            },
            y: {
              min: 0,
              max: 40000,
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
      printUtslappChart(dataUtslapp.data);
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
    if (canvas) {
      initializeChart(canvas.id);
    }
  });
});
