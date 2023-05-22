import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { toyService } from '../services/toy.service'
import { loadToys, saveToy } from '../store/toy.action.js'
import { removeToy } from '../store/toy.action.js'
import { saveFilter } from '../store/filter.action'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import ToyList from '../cmps/toy-list'
import ToyFilter from '../cmps/toy-filter'

function ToyIndex(props) {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys(filterBy)
  }, [filterBy])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch((err) => {
        showErrorMsg('Cannot remove toy')
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot add toy')
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?', toy.price)
    if (!price || price === toy.price) return

    const toyToSave = { ...toy, price }
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg('Cannot update toy')
      })
  }

  function onFilterChange(filter) {
    saveFilter({ ...filterBy, ...filter })
  }

  return (
    <section className="toy-index view">
      <h2>Our Selection</h2>
      <ToyFilter filterBy={filterBy} onFilterChange={onFilterChange} />
      <ToyList toys={toys} onRemoveToy={onRemoveToy} onAddToy={onAddToy} onEditToy={onEditToy} />
    </section>
  )
}

export default ToyIndex