import { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { Button } from '@mui/material'

import { toyService } from '../services/toy.service'

function ToyFilter({ onFilterChange, onSortChange, filterBy, sortBy }) {
  const [name, setName] = useState(filterBy.name)
  const [inStock, setInStock] = useState(filterBy.inStock)
  const [labels, setLabels] = useState(filterBy.labels)

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
      onFilterChange({ name })
    }, 400)
    return () => {
      clearTimeout(debounce)
    }
  }, [name])

  function onNameChange(e) {
    setName(e.target.value)
  }

  function onStockChange(e) {
    setInStock(e.target.value)
    onFilterChange({ inStock: e.target.value })
  }

  function sortChange(e, sortProp) {
    e.preventDefault()
    onSortChange({ [sortProp]: sortBy[sortProp] + 1 > 1 ? -1 : sortBy[sortProp] + 1 })
  }

  let sortNameIcon, sortPriceIcon
  sortNameIcon = sortPriceIcon = ''
  if (sortBy.sortName) {
    sortNameIcon = sortBy.sortName > 0 ? <i class="fa-solid fa-sort-up"></i> : <i class="fa-solid fa-sort-down"></i>
  } else if (sortBy.sortPrice) {
    sortPriceIcon = sortBy.sortPrice > 0 ? <i class="fa-solid fa-sort-up"></i> : <i class="fa-solid fa-sort-down"></i>
  }

  return (
    <form className="toy-filter">
      <div className="filters">
        <div className="filter-container name">
          <input value={name} onChange={onNameChange} type="text" name="name" placeholder="Search..."></input>
        </div>
        <div className="filter-container">
          <FormControl>
            <RadioGroup row aria-labelledby="stock-filter" defaultValue="all" name="stock">
              <FormControlLabel className="stock-radio-item" onChange={onStockChange} value="all" control={<Radio />} label="All" />
              <FormControlLabel
                className="stock-radio-item"
                onChange={onStockChange}
                value="true"
                control={<Radio />}
                label="Only in stock"
              />
              <FormControlLabel
                className="stock-radio-item"
                onChange={onStockChange}
                value="false"
                control={<Radio />}
                label="Only out of stock"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="filter-container labels">
          <label>Labels:</label>
          <FormControl className="label-select">
            <Select
              className="select-container"
              id="filter-labels"
              multiple
              value={labels}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              sx={{ fontSize: 14 }}
            >
              {toyService.getLabels().map((label) => (
                <MenuItem key={label} value={label}>
                  <Checkbox checked={labels.indexOf(label) > -1} />
                  <ListItemText className="label-list-item" primary={label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="sorts">
        <Button onClick={(e) => sortChange(e, 'sortName')}>Sort by name {sortNameIcon}</Button>
        <Button onClick={(e) => sortChange(e, 'sortPrice')}>Sort by price {sortPriceIcon}</Button>
      </div>
    </form>
  )
}

export default ToyFilter
