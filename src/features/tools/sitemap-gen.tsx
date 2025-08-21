import { getLocations } from "@features/locations";
import { getSpots } from "@features/locations/api/spots";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Accordion, AccordionHeader, Button, Card, CardBody, Stack } from "react-bootstrap";
import { toast } from "react-toastify";

const SPOT_URL_PREFIX = "https://www.surfe-diem.com/spot/"
const LOCATION_URL_PREFIX = "https://www.surfe-diem.com/location/"

const SiteMapGenerator = () => {
  const [urls, setUrl] = useState<string[]>([])

  const { data: locationData, isLoading: isLocationLoading, isError: isLocationError } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  });
  
  const { data: spotData, isLoading: isSpotDataLoading, isError: isSpotError } = useQuery({
    queryKey: ['spots'],
    queryFn: getSpots,
  });

  /**
     * Generate a list of urls from spot & location data
     */
    const handleGenerate = () => {
      if (spotData && spotData.length > 0) {
        setUrl((prevUrls = []) => [
          ...prevUrls,
          ...spotData.map(spot => SPOT_URL_PREFIX + spot.slug)
        ]);
      }
  
      if (locationData && locationData.length > 0) {
        setUrl((prevUrls = []) => [
          ...prevUrls,
          ...locationData.map(location => LOCATION_URL_PREFIX + location.location_id)
        ]);
      }
    }
  
    const handleCopy = () => {
      try {
        navigator.clipboard.writeText(urls.join('\n'))
        toast.success('Copied to clipboard');
      } catch {
        toast.error("something went wrong")
      }
    }

  return (
    <>
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3} className="d-flex">
          <h4 className="mb-0">
            <i className="bi bi-wrench me-2"></i>
            Site map generator
            {isLocationLoading && isSpotDataLoading ? (
              <i className="bi bi-arrow-clockwise ms-2"></i>
            ) : (
              <i className="bi bi-check2-circle ms-2"></i>
            )}
          </h4>
            <Button
              className=""
              variant="primary"
              onClick={handleGenerate}
              disabled={(isLocationLoading && isSpotDataLoading) || isLocationError}
            >Generate</Button>
            {urls.length > 0 && (
              <Button
                variant="outline-primary"
                onClick={handleCopy}
              >copy</Button>
            )}
        </Stack>
          <p className="text-muted mb-0">
            Generate a site map of the dynamic pages. Returns text output.
          </p>
      </Card.Header>
        <CardBody>
          {urls.length > 0 && (
            <Accordion>
              <Accordion.Item eventKey="0">
                <AccordionHeader>
                  <h5 className="mb-0">{"sitemap.txt"}</h5>
                </AccordionHeader>
                <Accordion.Body style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {urls.map((element, idx) => (
                    <span key={idx}>
                      {element}
                      <br />
                    </span>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
        </CardBody>
      </Card>
    </>
  )
}

export default SiteMapGenerator;