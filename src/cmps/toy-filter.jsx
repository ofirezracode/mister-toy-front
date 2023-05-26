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

import { toyService } from '../services/toy.service'

function ToyFilter({ onFilterChange, filterBy }) {
  console.log('filterBy', filterBy)
  filterBy = filterBy ? filterBy : toyService.getDefaultFilter()
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
    console.log('e.target.value', e.target.value)
    setInStock(e.target.value)
    onFilterChange({ inStock: e.target.value })
  }

  return (
    <form className="toy-filter">
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
      <div className="filter-container"></div>
    </form>
  )
}

export default ToyFilter
