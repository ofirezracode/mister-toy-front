import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Button from '@mui/material/Button'

import { toyService } from '../services/toy.service'
import { loadToys } from '../store/toy.action.js'
import { saveFilter, saveSort } from '../store/filter.action'

import ToyList from '../cmps/toy-list'
import ToyFilter from '../cmps/toy-filter'

function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  const [searchParams, setSearchParams] = useSearchParams('')

  useEffect(() => {
    saveFilter(toyService.getDefaultFilter(searchParams))
    saveSort(toyService.getDefaultSort(searchParams))
  }, [])

  useEffect(() => {
    loadToys(filterBy, sortBy)
  }, [filterBy, sortBy])

  function onFilterChange(filter) {
    saveFilter({ ...filterBy, ...filter })
    setSearchParams({ ...sortBy, ...filterBy, ...filter })
  }

  function onSortChange(sort) {
    saveSort({ sortName: 0, sortPrice: 0, ...sort })
    setSearchParams({ ...sortBy, ...filterBy, ...sort })
  }

  return (
    <section className="toy-index view">
      <h2>Our Selection</h2>
      <Link to={`/toy/add`}>
        <Button className="add-toy-btn" variant="contained">
          Add toy <i className="fa-solid fa-plus"></i>
        </Button>
      </Link>
      <ToyFilter sortBy={sortBy} filterBy={filterBy} onFilterChange={onFilterChange} onSortChange={onSortChange} />
      <ToyList toys={toys} />
    </section>
  )
}

export default ToyIndex
