import React from "react";
import { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Panel } from "primereact/panel";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DataAnak from "../store/DataAnak";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const { listAnak } = DataAnak((state) => state);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const chartRef = useRef(null)

  const grupKidsByUmur = (kids) => {
    const groups = {
      "1-2": 0,
      "3-4": 0,
      "5-6": 0,
      "7-8": 0,
      "9-10": 0,
    };
    kids.forEach((kid) => {
      if (kid.umur >= 1 && kid.umur <= 2) {
        groups["1-2"] += 1;
      } else if (kid.umur >= 3 && kid.umur <= 4) {
        groups["3-4"] += 1;
      } else if (kid.umur >= 5 && kid.umur <= 6) {
        groups["5-6"] += 1;
      } else if (kid.umur >= 7 && kid.umur <= 8) {
        groups["7-8"] += 1;
      } else if (kid.umur >= 9 && kid.umur <= 10) {
        groups["9-10"] += 1;
      }
    });
    console.log("GROUP ", groups);

    return Object.keys(groups).map((range) => ({
      range,
      count: groups[range],
    }));
  };

  useEffect(() => {
    if (listAnak && listAnak.length > 0) {
      const dataList = grupKidsByUmur(listAnak);
      console.log("Data test ", dataList);
      console.log("test lagi data", dataList.map((group) => group.count))
      console.log("test lagi label ", dataList.map((group) => group.range))

      if (chartRef.current) {
        console.log("Chart instance:", chartRef.current);
      }
      const data = {
        // umur 1-2, 3-4, 5-6, 7-8, 9-10
        labels: dataList.map((group) => group.range),
        datasets: [
          {
            label: "Persebaran Jumlah Anak ",
            data: dataList.map((group) => group.count),
            backgroundColor: dataList.map((_, index) => {
              const colors = [
                "rgba(255, 159, 64, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ];
              return colors[index % colors.length];
            }),
            borderColor: dataList.map((_, index) => {
              const borderColors = [
                "rgb(255, 159, 64)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(255, 99, 132)",
                "rgb(255, 206, 86)",
                "rgb(75, 192, 192)",
              ];
              return borderColors[index % borderColors.length];
            }),
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
        responsive:true,
      };

      setChartData(data);
      console.log("chart data ", chartData)
      setChartOptions(options);
      console.log("chart options ", options)
    }
  }, [chartData,listAnak] );

  return (
    <div>
      <h3>Selamat Datang ! </h3>
      <div className="grid">
        <div className="col-12 md:col-6">
          <Panel header="Distribusi Jumlah Anak dengan kategori Umur">
            <Bar data={chartData} options={chartOptions} ref={chartRef} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Home;
