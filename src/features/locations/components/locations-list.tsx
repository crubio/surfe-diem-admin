import { Accordion, Button } from "react-bootstrap";
import { Location } from "@features/locations/types";

interface Props {
  locations: Location[];
}

export const LocationsList = (props: Props) => {
  const {locations} = props;

  function generateLocationList(locations: Location[]) {
    return (
      <ul className="list-group">
        {locations.map((location: Location) => (
          <li key={location.id} className="list-group-item">
            <Accordion className="accordion-flush">
              <Accordion.Item eventKey={location.location_id}>
                <Accordion.Header><h2 className="fs-6">{location.name}</h2></Accordion.Header>
                <Accordion.Body>
                  <p><span className="fw-bold">id</span>: {location.location_id}</p>
                  <p><span className="fw-bold">database id</span>: {location.id}</p>
                  <p><span className="fw-bold">description</span>: {location.description}</p>
                  <p><span className="fw-bold">location</span>: {location.location}</p>
                  <p><span className="fw-bold">depth</span>: {location.depth}</p>
                  <p><span className="fw-bold">elevation</span>: {location.elevation}</p>
                  <p><span className="fw-bold">last updated</span>: {location.date_updated}</p>
                  <Button variant="link">Edit</Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      {generateLocationList(locations)}
    </>
  )
}
