import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function ResetAllFilters({ resetFilters, totalEarthquakes, totalFiltered }) {
  return (
    <Row className="p-4">          
      <h5 className="text-center color-main">{`Showing ${totalFiltered} of ${totalEarthquakes} total earthquakes`}</h5>
      <div className="text-center mb-4">        
        <Button variant="outline-secondary" disabled={totalFiltered < totalEarthquakes ? false : true} onClick={resetFilters}>Show all</Button>
      </div>
      <hr />
    </Row> 
  )
}