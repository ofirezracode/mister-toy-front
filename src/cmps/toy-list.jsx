import ToyPreview from './toy-preview'

function ToyList({ toys, onRemoveToy, onEditToy }) {
  return (
    <ul className="toy-list clean-list flex justify-center">
      {toys.map((toy) => (
        <li key={toy._id}>
          <ToyPreview toy={toy} onRemoveToy={onRemoveToy}></ToyPreview>
        </li>
      ))}
    </ul>
  )
}

export default ToyList
