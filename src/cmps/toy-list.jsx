import ToyPreview from './toy-preview'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

function ToyList({ toys }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li key={toy._id}>
          <ToyPreview toy={toy}>
            <div className="preview-buttons">
              <Button variant="contained">
                <Link to={`/toy/${toy._id}`}>Details...</Link>
              </Button>
            </div>
          </ToyPreview>
        </li>
      ))}
    </ul>
  )
}

export default ToyList
