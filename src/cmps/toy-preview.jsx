function ToyPreview({ toy, onRemoveToy }) {
  return (
    <article className="toy-preview">
      <header>
        <h3>{toy.name}</h3>
        <p>{toy.price}</p>
      </header>
      <div className="labels">
        {toy.labels.map((label, i) => (
          <label key={i}>{label}</label>
        ))}
      </div>
      <div className="in-stock">{toy.inStock === 'true' ? 'In stock!' : 'Not in stock...'}</div>
    </article>
  )
}

export default ToyPreview
