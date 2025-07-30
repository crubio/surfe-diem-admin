import { getSummaries } from "@features/summaries/api/summaries";
import { Summary } from "@features/summaries/types";
import { useQuery } from "@tanstack/react-query";
import { Table, Alert, Card } from "react-bootstrap";
import { Loading } from "@features/ui/loading";

function SummariesPage() {
  const { data, isError, isLoading } = useQuery<Summary[]>({
    queryKey: ['summaries'],
    queryFn: getSummaries,
  });
  
  const summaries = data || [];

  function generateSummaryTable() {
    return (
      summaries.map((summary: Summary): JSX.Element => (
        <tr key={summary.id}>
          <td>{summary.id}</td>
          <td>{summary.location_id}</td>
          <td>{summary.timestamp}</td>
          <td>{summary.date_created}</td>
          <td>{summary.wvht}</td>
          <td>{summary.precipitation}</td>
          <td>{summary.wind}</td>
          <td>{summary.gust}</td>
          <td>{summary.peak_period}</td>
          <td>{summary.water_temp}</td>
          <td>{summary.swell}</td>
          <td>{summary.period}</td>
          <td>{summary.direction}</td>
          <td>{summary.wind_wave}</td>
          <td>{summary.ww_period}</td>
          <td>{summary.ww_direction}</td>
        </tr>
      ))
    )
  }
  
  return (
    <div className="py-4">
      <h1 className="mb-4">Wave Summaries</h1>
      
      <Card>
        <Card.Body>
          <Card.Text className="text-muted mb-3">
            Showing the last 50 summaries from the API. For more information on the data, see{' '}
            <a href="https://www.ndbc.noaa.gov/measdes.shtml" target="_blank" rel="noopener noreferrer">
              NOAA's National Data Buoy Center
            </a>.
          </Card.Text>
          
          {isLoading && <Loading text="Loading summaries..." />}
          
          {isError && (
            <Alert variant="danger">
              <Alert.Heading>Error Loading Summaries</Alert.Heading>
              <p>There was an error loading the wave summaries. Please try refreshing the page.</p>
            </Alert>
          )}
          
          {!isLoading && !isError && (
            <>
              {summaries.length > 0 ? (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Location ID</th>
                        <th>NOAA Timestamp</th>
                        <th>Date Created</th>
                        <th>Wave Height</th>
                        <th>Precipitation</th>
                        <th>Wind</th>
                        <th>Gust</th>
                        <th>Peak Period</th>
                        <th>Water Temp</th>
                        <th>Swell</th>
                        <th>Period</th>
                        <th>Direction</th>
                        <th>Wind Wave</th>
                        <th>WW Period</th>
                        <th>WW Direction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateSummaryTable()}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <Alert variant="info">
                  <Alert.Heading>No Summaries Found</Alert.Heading>
                  <p>No wave summaries are currently available. Check the daily_summaries cron job if this persists.</p>
                </Alert>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SummariesPage;