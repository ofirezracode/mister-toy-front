import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Switch from '@mui/material/Switch'

import { toyService } from '../services/toy.service'
import { Button, Checkbox, FormControl, ListItemText, MenuItem, Select } from '@mui/material'
import { saveToy } from '../store/toy.action'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

function AddToy({ children }) {
  const { toyId } = useParams()
  const [toy, setToy] = useState(toyService.getEmptyToy())

  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) toyService.getById(toyId).then((resToy) => setToy(resToy.toy))
  }, [toyId])

  function handleChange({ target }) {
    const field = target.name
    console.log('target', target.type)
    let value
    if (target.type === 'number') {
      value = +target.value
    } else if (field === 'inStock') {
      value = toy.inStock === 'true' ? 'false' : 'true'
    } else {
      value = target.value
    }
    setToy((prev) => ({ ...prev, [field]: value }))
  }

  function onSubmit() {
    saveToy(toy)
      .then((savedToy) => {
        if (toyId) navigate(`/toy/${toy._id}`)
        else navigate('/toy')
      })
      .catch((err) => {
        showErrorMsg('Cannot add toy')
      })
  }
  return (
    <section className="add-toy view">
      <h2>{toyId ? 'Edit toy' : 'Add toy'}</h2>
      <form>
        <div className="input-container">
          <label htmlFor="name">Product name</label>
          <input value={toy.name} onChange={handleChange} type="text" name="name"></input>
        </div>
        <div className="input-container">
          <label htmlFor="price">Price</label>
          <input value={toy.price} onChange={handleChange} type="number" name="price"></input>
        </div>
        <div className="input-container">
          <label htmlFor="inStock">In stock</label>
          <Switch checked={toy.inStock === 'true'} name="inStock" onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
        </div>
        <div className="input-container">
          <label>Labels</label>
          <FormControl className="label-select">
            <Select
              name="labels"
              className="select-container"
              multiple
              value={toy.labels}
              onChange={handleChange}
              renderValue={(selected) => selected.join(', ')}
              sx={{ fontSize: 14, width: '100%' }}
            >
              {toyService.getLabels().map((label) => (
                <MenuItem key={label} value={label}>
                  <Checkbox checked={toy.labels.indexOf(label) > -1} />
                  <ListItemText className="label-list-item" primary={label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button onClick={onSubmit}>
          Done <i className="fa-solid fa-check"></i>
        </Button>
      </form>
    </section>
  )
}

export default AddToy
