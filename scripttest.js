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