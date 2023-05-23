import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'

function ToyPreview({ toy, onRemoveToy }) {
  return (
    <Card variant="outlined">
      <CardContent className="toy-preview">
        <header>
          <h3>{toy.name}</h3>
          <p>{toy.price}</p>
        </header>
        <div className="labels flex">
          {toy.labels.map((label, i) => (
            <Chip size="small" key={i} label={label} />
          ))}
        </div>
        <div className="in-stock">{toy.inStock === 'true' ? 'In stock!' : 'Not in stock...'}</div>
      </CardContent>
    </Card>
  )
}

export default ToyPreview
