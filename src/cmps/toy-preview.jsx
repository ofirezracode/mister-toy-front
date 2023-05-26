import Chip from '@mui/material/Chip'

function ToyPreview({ children, toy }) {
  return (
    <article className="toy-preview" variant="outlined">
      <header>
        <h3>{toy.name}</h3>
      </header>
      <div className="labels">
        {toy.labels.map((label, i) => (
          <Chip size="small" key={i} label={label} />
        ))}
      </div>
      <div className="preview-row">
        <p className="price">{toy.price}</p>
        <p className="in-stock">{toy.inStock === 'true' ? 'In stock!' : 'Not in stock...'}</p>
      </div>
      {children}
    </article>
  )
}

export default ToyPreview
