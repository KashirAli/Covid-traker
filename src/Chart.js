import React from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

function Chart({Data,Label,labelString}) {
        console.log(labelString)
        const data = {
            labels :Label,
            datasets : [{
                label: labelString,
                data: Data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                fill: 'origin',
            }]
        }
    const options={
            plugins: {
                legend: {
                    display: false,
                   
                },
                elements: {
                    point: {
                      radius: 5,
                      hoverRadius:15
                    },
                  },
                title: {
                    display: false,
                  }
            },
            tooltips: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                  },
                },
              },
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      format: "MM/DD/YY",
                      tooltipFormat: "ll",
                    },
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function (value, index, values) {
                        return numeral(value).format("0a");
                      },
                    },
                  },
                ],
              }

    }
    const options2 = {
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              return numeral(tooltipItem.value).format("+0,0");
            },
          },
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return numeral(value).format("0a");
                },
              },
            },
          ],
        },
      };

    
    return (
        <div>
        <Line
            data = {data}
            options={options}
         />
        </div>
    )
}

export default Chart
