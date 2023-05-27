import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import ToyPreview from '../cmps/toy-preview'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { removeToy } from '../store/toy.action.js'
import { toyService } from '../services/toy.service'

function ToyDetails() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(toyService.getEmptyToy())
  const navigate = useNavigate()

  useEffect(() => {
    toyService.getById(toyId).then((resToy) => setToy(resToy.toy))
  }, [toyId])

  function onRemoveToy() {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
        navigate('/toy')
      })
      .catch((err) => {
        showErrorMsg('Cannot remove toy')
      })
  }

  return (
    <section className="toy-details view">
      <ToyPreview toy={toy}>
        <div className="details-buttons">
          <Link to={`/toy/add/${toy._id}`}>
            <Button variant="contained">
              Edit <i className="fa-solid fa-pen-to-square"></i>
            </Button>
          </Link>
          <Button onClick={onRemoveToy} variant="contained">
            Delete <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
      </ToyPreview>
    </section>
  )
}

export default ToyDetails
