import { useState } from 'react'

export function useBarChart(initialState) {
  const [barData, setBarData] = useState({
    labels: initialState.labels || [],
    datasets: [
      {
        label: initialState.datasetLabel || 'dataset',
        data: initialState.data || [],
        backgroundColor: initialState.color || 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  const [labels, setLabels] = useState(initialState.labels || [])
  const [datasetLabel, setDatasetLabel] = useState(initialState.datasetLabel || 'dataset')
  const [data, setData] = useState(initialState.data || [])
  const [backgroundColor, setBackgroundColor] = useState(initialState.color || 'rgba(255, 99, 132, 0.5)')

  function setBarProp(changes) {
    for (const change in changes) {
      switch (change) {
        case 'labels':
          setLabels(changes[change])
          break
        case 'datasetLabel':
          setDatasetLabel(changes[change])
          break
        case 'data':
          setData(changes[change])
          break
        case 'backgroundColor':
          setBackgroundColor(changes[change])
          break
        default:
          break
      }
    }

    setBarData({ labels, datasets: [{ label: datasetLabel, data, backgroundColor }] })
  }

  return [barData, setBarData, setBarProp]
}
