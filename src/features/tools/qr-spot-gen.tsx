import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useQuery } from "@tanstack/react-query";
import { getSpots } from "@features/locations/api/spots";
import { Spot } from "@features/locations";
import { Card } from "react-bootstrap";

export default function QRSpotGen() {
  const [selected, setSelected] = useState<Spot | null>(null);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("Arial");

  const qrRef = useRef<HTMLDivElement>(null);

  const { data: spotData, isLoading, isError } = useQuery({
    queryKey: ["spots"],
    queryFn: getSpots,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 200);
    return () => clearTimeout(handler);
  }, [filter]);

  const filteredSpots = spotData?.filter((spot: Spot) =>
    spot.name.toLowerCase().includes(debouncedFilter.toLowerCase())
  ) || [];

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${selected?.name || "qr-code"}.png`;
    link.click();
  };

  const selectedUrl = selected ? `https://surfe-diem.com/spots/${selected.slug}` : "https://surfe-diem.com";

  return (
    <Card>
      <Card.Header>
      <h4 className="mb-3">
        <i className="bi bi-qr-code me-2"></i>
        QR Code Generator
      </h4>
      </Card.Header>
      {isLoading && <p>Loading spots...</p>}
      {isError && <p>Error loading spots</p>}
      <Card.Body>
        {!isLoading && !isError && (
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="spotSelect" className="form-label">Select Spot</label>
                  <input
                    className="form-control"
                    list="spotsDatalist"
                    id="spotSelect"
                    placeholder="Type to search spots..."
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value);
                      const match = spotData?.find(
                        (s: Spot) => s.name.toLowerCase() === e.target.value.toLowerCase()
                      );
                      setSelected(match || null);
                    }}
                  />
                  <datalist id="spotsDatalist">
                    {filteredSpots.map((spot: Spot) => (
                      <option key={spot.slug} value={spot.name} />
                    ))}
                  </datalist>
                </div>

                <div className="mb-3">
                  <label htmlFor="qrSize" className="form-label">QR Code Size</label>
                  <select
                    id="qrSize"
                    className="form-select"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                  >
                    {[150, 200, 250, 300, 400].map((size) => (
                      <option key={size} value={size}>{size}px</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 d-flex gap-2">
                  <div>
                    <label htmlFor="fgColor" className="form-label">Foreground Color</label>
                    <input
                      id="fgColor"
                      type="color"
                      className="form-control form-control-color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bgColor" className="form-label">Background Color</label>
                    <input
                      id="bgColor"
                      type="color"
                      className="form-control form-control-color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="fontSelect" className="form-label">Font</label>
                  <select
                    id="fontSelect"
                    className="form-select"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                  >
                    {["Arial", "Courier New", "Georgia", "Roboto", "Press Start 2P", "Lobster", "Pacifico", "Quicksand"].map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col">
                <div style={{ textAlign: "center" }} ref={qrRef}>
                  <p style={{ fontFamily: fontFamily.includes(' ') ? `"${fontFamily}"` : fontFamily }}>
                    <strong>{selected ? selected.name : "Surfe Diem"}</strong>
                  </p>
                  <QRCodeCanvas value={selectedUrl} size={qrSize} fgColor={fgColor} bgColor={bgColor} />
                  <p style={{ marginTop: "0.5rem", fontFamily: fontFamily.includes(' ') ? `"${fontFamily}"` : fontFamily, userSelect: "all" }}>
                    {selectedUrl}
                  </p>
                  <div style={{ marginTop: "1rem" }}>
                    <button className="btn btn-primary" onClick={handleDownload}>
                      Download QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
