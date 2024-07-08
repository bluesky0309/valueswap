import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const ApexChart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1998, 1994, 1995, 1996, 1997, 1998, 1998],
      tooltip: {
        enabled: true,
      },
    },
    theme: {
      palette: 'palette1',
      monochrome: {
        enabled: false
      }
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 50, 49, 60, 70, 91, 40, 45, 50]
    }
  ]);

  const [chartWidth, setChartWidth] = useState();

  const handleResize = () => {
    if(window.innerWidth < 400){
      setChartWidth(300);
    }
    else if(window.innerWidth < 600 ){
      setChartWidth(450);
    }else if(window.innerWidth > 768 && window.innerWidth < 1300 ){
      setChartWidth(550);
    }else if(window.innerWidth > 1300 ){
      setChartWidth(600);
    }

   
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width={chartWidth} height="300" />
        </div>
      </div>
    </div>
  );
};

export default ApexChart;
