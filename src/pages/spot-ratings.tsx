import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Card, Form, InputGroup, Stack } from "react-bootstrap";
import { getRatingsSummary } from "@features/ratings/api/ratings";
import { RatingsSummaryTable } from "@features/ratings/components/ratings-summary-table";
import { SpotRatingsDetail } from "@features/ratings/components/spot-ratings-detail";
import { Loading } from "@features/ui/loading";
import { RatingsSummary, RatingsSummaryItem } from "@features/ratings/types";

const LIMIT_OPTIONS = [5, 10, 25, 50];

function SpotRatingsPage() {
  const [limit, setLimit] = useState(10);
  const [selectedSpot, setSelectedSpot] = useState<RatingsSummaryItem | null>(null);

  const { data, isLoading, isError } = useQuery<RatingsSummary>({
    queryKey: ["ratings-summary", limit],
    queryFn: () => getRatingsSummary(limit),
  });

  return (
    <div className="py-4">
      <Stack direction="horizontal" gap={3} className="mb-4">
        <div className="p-2">
          <h1>Spot Ratings</h1>
        </div>
        <div className="p-2 ms-auto">
          <InputGroup size="sm">
            <InputGroup.Text>Top</InputGroup.Text>
            <Form.Select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              style={{ width: "80px" }}
            >
              {LIMIT_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Form.Select>
            <InputGroup.Text>spots</InputGroup.Text>
          </InputGroup>
        </div>
      </Stack>

      <Card>
        <Card.Body>
          <Card.Text className="text-muted mb-3">
            Top spots by rating count. Click <strong>Details</strong> to inspect individual user feedback.
          </Card.Text>

          {isLoading && <Loading text="Loading ratings summary..." />}

          {isError && (
            <Alert variant="danger">
              <Alert.Heading>Error Loading Ratings</Alert.Heading>
              <p>There was an error loading the ratings summary. Please try refreshing the page.</p>
            </Alert>
          )}

          {!isLoading && !isError && data && data.length === 0 && (
            <Alert variant="info">
              <Alert.Heading>No Ratings Found</Alert.Heading>
              <p>No spot ratings data is available yet.</p>
            </Alert>
          )}

          {!isLoading && !isError && data && data.length > 0 && (
            <RatingsSummaryTable items={data} onSelectSpot={setSelectedSpot} />
          )}
        </Card.Body>
      </Card>

      <SpotRatingsDetail
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
      />
    </div>
  );
}

export default SpotRatingsPage;
