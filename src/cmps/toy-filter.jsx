import { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

import { toyService } from '../services/toy.service'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function ToyFilter({ onFilterChange, filterBy }) {
  console.log('filterBy', filterBy)
  filterBy = filterBy ? filterBy : toyService.getDefaultFilter()
  const [name, setName] = useState(filterBy.name)
  const [inStock, setInStock] = useState(filterBy.inStock)
  const [labels, setLabels] = useState(filterBy.labels)
  const [isWriting, setIsWriting] = useState(false)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    const newLabels = typeof value === 'string' ? value.split(',') : value
    setLabels(newLabels)
    onFilterChange({ labels: newLabels })
  }

  useEffect(() => {
    setName(filterBy.name)
    setInStock(filterBy.inStock)
    setLabels(filterBy.labels)
  }, [filterBy])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isWriting) {
        setIsWriting(false)
        onFilterChange({ name })
      }
    }, 400)
    return () => {
      clearTimeout(debounce)
    }
  }, [isWriting])

  function onNameChange(e) {
    setIsWriting(true)
    setName(e.target.value)
  }

  function onStockChange(e) {
    console.log('e.target.value', e.target.value)
    setInStock(e.target.value)
    onFilterChange({ inStock: e.target.value })
  }

  return (
    <form>
      <div className="filter-container">
        <label htmlFor="name">Name</label>
        <input value={name} onChange={onNameChange} type="text" name="name" placeholder="Search..."></input>
      </div>
      <div className="filter-container">
        <label htmlFor="in-stock-all">All</label>
        <input onChange={onStockChange} id="in-stock-all" type="radio" name="in-stock" value="all" checked={inStock === 'all'}></input>
        <label htmlFor="in-stock-stock">Only in stock</label>
        <input onChange={onStockChange} id="in-stock-stock" type="radio" name="in-stock" value="true" checked={inStock === 'true'}></input>
        <label htmlFor="in-stock-out">Only out of stock</label>
        <input onChange={onStockChange} id="in-stock-out" type="radio" name="in-stock" value="false" checked={inStock === 'false'}></input>
      </div>
      <div className="filter-container">
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={labels}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {toyService.getLabels().map((label) => (
              <MenuItem key={label} value={label}>
                <Checkbox checked={labels.indexOf(label) > -1} />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="filter-container"></div>
    </form>
  )
}

export default ToyFilter
