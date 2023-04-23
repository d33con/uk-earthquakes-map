import React from "react";
import Row from "react-bootstrap/Row";

export default function Footer() {
  return (
    <Row>
      <p className="text-center">
        Data from{" "}
        <a
          href="https://earthquakes.bgs.ac.uk/earthquakes/home.html"
          target="_blank"
          rel="noreferrer"
        >
          BGS
        </a>{" "}
        - by{" "}
        <a href="https://github.com/d33con" target="_blank" rel="noreferrer">
          Oliver Bullen
        </a>
      </p>
    </Row>
  );
}
