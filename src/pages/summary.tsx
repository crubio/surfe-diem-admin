import { getSummaries } from "@features/summaries/api/summaries";
import { Summary } from "@features/summaries/types";
import { useQuery } from "@tanstack/react-query";
import { Table } from "react-bootstrap";

function SummariesPage() {
  const { data, isError, isFetched, isLoading} = useQuery(["summaries"], getSummaries);
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
    <>
      <h1>Wave Summaries</h1>
      <p>Showing the last 50 summaries from "/api/v1/locations/summary". If there are none, check the daily_summaries cron job.</p>
      <p>For more information on the data, see <a href="https://www.ndbc.noaa.gov/measdes.shtml" target="_blank">NOAA's National Data Buoy Center</a>.</p>
      {data?.length ? 
        (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>location_id</th>
                <th>noaa timestamp</th>
                <th>date created</th>
                <th>wvht</th>
                <th>precipitation</th>
                <th>wind</th>
                <th>gust</th>
                <th>pp</th>
                <th>water temp</th>
                <th>swell</th>
                <th>period</th>
                <th>dir</th>
                <th>ww</th>
                <th>ww period</th>
                <th>ww direction</th>
              </tr>
            </thead>
            <tbody>
              {summaries && isFetched && !isLoading && !isError && generateSummaryTable()}
            </tbody>
          </Table>    
        ) : (
          <p>No summaries found.</p>
        )}
    </>
  )
}

export default SummariesPage;