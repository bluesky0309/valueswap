import React, { useState } from "react";
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
      palette: 'palette1', // This line can be removed if you are defining a custom palette
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

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="600" height="400" />
        </div>
      </div>
    </div>
  );
};

export default ApexChart;
