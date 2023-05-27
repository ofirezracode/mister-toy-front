import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/toy.action'

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'

import { utilService } from '../services/util.service'
import { toyService } from '../services/toy.service'
import { useBarChart } from '../customHooks/useBarChart'

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Percent in stock for label',
    },
  },
}

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Comparison between labels for year',
    },
  },
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const onWheels = [362, 219, 475, 303, 568, 829, 205, 428, 779, 368, 717, 532]

const boxGame = [538, 641, 841, 512, 342, 497, 620, 157, 139, 612, 468, 376]

export const lineData = {
  labels: months,
  datasets: [
    {
      label: 'On Wheels',
      data: onWheels,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Box Game',
      data: boxGame,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

function Dashboard({}) {
  const toys = useSelector((storeState) => storeState.toyModule.toys)

  const avgByLabel = toyService.getAvgByLabel(toys)
  const doughnutData = {
    labels: avgByLabel.labels,
    datasets: [
      {
        label: 'Price average',
        data: avgByLabel.priceAvgs,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(116, 199, 108, 1)',
        ],
        borderColor: ['#fff8d6', '#fff8d6', '#fff8d6', '#fff8d6', '#fff8d6', '#fff8d6'],
        borderWidth: 3,
      },
    ],
  }

  const [barData, setBarData, setBarProp] = useBarChart({ datasetLabel: 'Percent in stock' })
  useEffect(() => {
    loadToys()
  }, [])

  useEffect(() => {
    const { labels, percentages } = toyService.getInStockByLabel(toys)
    setBarProp({ labels, data: percentages })
  }, [toys])

  return (
    <section className="dashboard view">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Bar height={300} options={barOptions} data={barData} />
        </li>
        <li>
          <Line height={300} options={lineOptions} data={lineData} />;
        </li>
        <li>
          <Doughnut height={300} data={doughnutData} />;
        </li>
      </ul>
    </section>
  )
}

export default Dashboard
