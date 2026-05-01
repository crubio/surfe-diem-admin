import { RatingsSummaryItem } from "../types";
import { Table, Badge, Button } from "react-bootstrap";

interface Props {
  items: RatingsSummaryItem[];
  onSelectSpot: (item: RatingsSummaryItem) => void;
}

export function RatingsSummaryTable({ items, onSelectSpot }: Props) {
  return (
    <Table hover responsive className="mb-0">
      <thead className="table-light">
        <tr>
          <th>Spot</th>
          <th className="text-center">Total</th>
          <th className="text-center">Accurate</th>
          <th className="text-center">Not Accurate</th>
          <th className="text-center">Accuracy %</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.spot_id}>
            <td className="fw-medium">{item.spot_slug}</td>
            <td className="text-center">
              <Badge bg="secondary">{item.total}</Badge>
            </td>
            <td className="text-center text-success fw-medium">{item.accurate}</td>
            <td className="text-center text-danger fw-medium">{item.not_accurate}</td>
            <td className="text-center">
              <Badge bg={item.accuracy_pct >= 70 ? "success" : "warning"}>
                {item.accuracy_pct.toFixed(0)}%
              </Badge>
            </td>
            <td className="text-end">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onSelectSpot(item)}
              >
                <i className="bi bi-list-ul me-1"></i>
                Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
