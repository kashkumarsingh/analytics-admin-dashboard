import ApexCharts from 'apexcharts';
$(function ($) {
    const chartConfig = {
      chart: {
        height: 350,
        type: "bar",
        fontFamily: "Popins, sans-serif",
        foreColor: "#6780B1",
      },
      plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      series: [
        { name: "New Users", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
        { name: "Unique Users", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
        { name: "Returning Users", data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
      ],
      colors: ["#66a4fb", "#e4eaff", "#65e0e0"],
      xaxis: {
        categories: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JUL",
          "AUG",
          "SEP",
        ],
      },
      yaxis: { title: { text: "K" } },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: (e) => {
            return "" + e + "K";
          },
        },
      },
    };
    const audienceChart = new ApexCharts(
      document.querySelector("#audienceOverviewBar"),
      chartConfig
    );
    audienceChart.render();
  
    const a = [
      {
        label: "New User",
        fontFamily: "Popins, sans-serif",
        foreColor: "#6780B1",
        data: [[1, 50]],
        color: "#66a4fb",
      },
      { label: "Page Views", data: [[1, 40]], color: "#ffcc00" },
      { label: "Page Session", data: [[1, 90]], color: "#00cc66" },
      { label: "Bounce Rate", data: [[1, 70]], color: "#ff3399" },
    ];
    $.plot("#sessionsDeviceDonut", a, {
      series: {
        pie: {
          show: true,
          radius: 1,
          innerRadius: 0.5,
          label: { show: true, radius: 2 / 3, formatter: c, threshold: 0.1 },
        },
      },
      grid: { hoverable: true, clickable: true },
    });
  
    function c(e, f) {
      return (
        "<div style='font-size:7pt; text-align:center; padding:2px; color:white;'>" +
        e +
        "<br/>" +
        Math.round(f.percent) +
        "%</div>"
      );
    }
    // Behaviour chart
    const b1 = {
      series: [
        {
          name: "CLICK THROUGH",
          type: "column",
          data: [8338],
        },
        {
          name: "BOUNCE RATE",
          type: "column",
          data: [49.38],
        },
        {
          name: "AVG. SESSION",
          type: "column",
          data: [8338],
        },
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: ["Metrics"],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "category",
      },
      yaxis: {
        title: {
          text: "Value",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              if (y % 1 === 0) {
                return y.toFixed(0);
              } else {
                return y.toFixed(2) + "%";
              }
            }
            return y;
          },
        },
      },
    };
    const behaviorChart = new ApexCharts(
      document.querySelector("#behaviorAreaChart"),
      b1
    );
    behaviorChart.render();
  
    const b2 = {
      series: [
        {
          name: "TRANSACTIONS",
          type: "column",
          data: [45, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: "REVENUE",
          type: "area",
          data: [45, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: "TOTAL CONVERSIONS",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: { show: false },
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        "01/01/2022",
        "02/01/2022",
        "03/01/2022",
        "04/01/2022",
        "05/01/2022",
        "06/01/2022",
        "07/01/2022",
        "08/01/2022",
        "09/01/2022",
        "10/01/2022",
        "11/01/2022",
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Amount",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return "$" + y.toFixed(2);
            }
            return y;
          },
        },
      },
    };
  
    const revenueChart = new ApexCharts(
      document.querySelector("#revenueAreaChart"),
      b2
    );
    revenueChart.render();
  
    // Visitors by devices
    const b3 = {
      chart: {
        height: 225,
        type: "donut",
        fontFamily: "Popins, sans-serif",
        foreColor: "#6780B1",
        toolbar: { show: false },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "18px",
                fontFamily: "Popins, sans-serif",
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: "Popins, sans-serif",
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
                formatter: (val) => {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: "Total",
                fontSize: "18px",
                fontFamily: "Popins, sans-serif",
                fontWeight: 600,
                color: "#444",
                formatter: (w) => {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
      series: [144, 176, 115],
      labels: ["Desktop", "Mobile", "Others"],
      colors: ["#66a4fb", "#e4eaff", "#65e0e0"],
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        fontFamily: "IBM Plex Sans, sans-serif",
        fontWeight: 400,
        offsetX: 0,
        offsetY: 0,
      },
    };
    const visitorsChart = new ApexCharts(
      document.querySelector("#visitorsByDevices"),
      b3
    );
    visitorsChart.render();
  });
