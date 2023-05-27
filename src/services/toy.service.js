import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getLabels,
  getInStockByLabel,
  getAvgByLabel,
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}
function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: [],
    inStock: false,
  }
}

function getDefaultFilter(searchParams = { get: () => {} }) {
  return {
    name: searchParams.get('name') || '',
    inStock: searchParams.get('inStock') || 'all',
    labels: searchParams.get('labels') || [],
    pageIdx: +searchParams.get('pageIdx') || 0,
  }
}

function getDefaultSort(searchParams = { get: () => {} }) {
  return {
    sortName: +searchParams.get('sortName') || 0,
    sortPrice: +searchParams.get('sortPrice') || 0,
  }
}

function getLabels() {
  return labels
}

function getInStockByLabel(toys = []) {
  const data = toys.reduce((acc, toy) => {
    toy.labels.forEach((label) => {
      if (acc[label]) {
        acc[label].amount++
      } else {
        acc[label] = { amount: 1, inStockAmount: 0 }
      }
      if (toy.inStock === 'true') {
        acc[label].inStockAmount++
      }
    })
    return acc
  }, {})
  const labels = Object.keys(data)
  const percentages = Object.values(data).map((labelData) => ((labelData.inStockAmount * 100) / labelData.amount).toFixed(0))
  return { labels, percentages }
}

function getAvgByLabel(toys = []) {
  const data = toys.reduce((acc, toy) => {
    toy.labels.forEach((label) => {
      if (acc[label]) {
        acc[label].price += toy.price
        acc[label].amount++
      } else {
        acc[label] = { amount: 1, price: toy.price }
      }
    })
    return acc
  }, {})
  const labels = Object.keys(data)
  const priceAvgs = Object.values(data).map((labelData) => (labelData.price / labelData.amount).toFixed(2))
  return { labels, priceAvgs }
}
