import { Modal, Table, Badge, Alert, Spinner, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getSpotRatings } from "../api/ratings";
import { RatingsSummaryItem, SpotRating, SpotRatingsResponse } from "../types";

interface Props {
  spot: RatingsSummaryItem | null;
  onClose: () => void;
}

function RatingBadge({ rating }: { rating: SpotRating["rating"] }) {
  return rating === "accurate" ? (
    <Badge bg="success">Accurate</Badge>
  ) : (
    <Badge bg="danger">Not Accurate</Badge>
  );
}

export function SpotRatingsDetail({ spot, onClose }: Props) {
  const { data, isLoading, isError } = useQuery<SpotRatingsResponse>({
    queryKey: ["spot-ratings", spot?.spot_id],
    queryFn: () => getSpotRatings(spot!.spot_id),
    enabled: spot != null,
  });

  return (
    <Modal show={spot != null} onHide={onClose} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-star-half me-2"></i>
          {spot?.spot_slug}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && (
          <div className="d-flex justify-content-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {isError && (
          <Alert variant="danger">
            <Alert.Heading>Failed to load ratings</Alert.Heading>
            <p className="mb-0">There was an error fetching ratings for this spot.</p>
          </Alert>
        )}

        {!isLoading && !isError && data && (
          <>
            <Row className="mb-4 text-center g-3">
              <Col>
                <div className="border rounded p-3">
                  <div className="fs-4 fw-bold">{data.summary.total}</div>
                  <div className="text-muted small">Total</div>
                </div>
              </Col>
              <Col>
                <div className="border rounded p-3">
                  <div className="fs-4 fw-bold text-success">{data.summary.accurate}</div>
                  <div className="text-muted small">Accurate</div>
                </div>
              </Col>
              <Col>
                <div className="border rounded p-3">
                  <div className="fs-4 fw-bold text-danger">{data.summary.not_accurate}</div>
                  <div className="text-muted small">Not Accurate</div>
                </div>
              </Col>
              <Col>
                <div className="border rounded p-3">
                  <div className="fs-4 fw-bold">{data.summary.accuracy_pct.toFixed(0)}%</div>
                  <div className="text-muted small">Accuracy</div>
                </div>
              </Col>
            </Row>

            {data.ratings.length === 0 ? (
              <Alert variant="info">No individual ratings found for this spot.</Alert>
            ) : (
              <Table responsive hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th className="text-center">Rating</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {data.ratings.map((r) => (
                    <tr key={r.id}>
                      <td className="text-muted small">{r.id}</td>
                      <td className="text-center">
                        <RatingBadge rating={r.rating} />
                      </td>
                      <td className="text-muted small text-nowrap">
                        {new Date(r.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
