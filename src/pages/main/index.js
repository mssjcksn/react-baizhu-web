import React, { useState } from "react";
import { Container, Row, Col, Card, Form, FloatingLabel, Button, Spinner } from "react-bootstrap"; /* prettier-ignore */

import { diagnose } from "../../api/bot";

import icon from "../../images/icon.png";
import loadingIcon from "../../images/loading.png";
import resultIcon from "../../images/result.png";
import errorIcon from "../../images/error.png";
import styles from "./styles.module.css";
const MainPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, triggerShowError] = useState(false);

  const handleChange = (e) => {
    setResults(null);
    setQuery(e.target.value);
  };

  const handleClick = async () => {
    await diagnose(
      {
        query: query,
      },
      (response) => {
        setResults(response.message);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        triggerShowError(4500);
        setResults(null);
        setLoading(false);
      }
    );
  };
  return (
    <Container fluid>
      <Row className="vh-100 justify-content-center align-items-center">
        <Card className="w-50">
          <Card.Body>
            <Card.Title className="d-flex justify-content-center align-items-center flex-column ">
              <img src={icon} className={styles.icon} alt="Baizhu Icon" />
              <span className={`${styles.name} text-center mb-2`}>
                🌿 Baizhu, Liyue's Health Assistant 🌿
              </span>
            </Card.Title>
            <Card.Subtitle
              className={`${styles.description} d-flex justify-content-center align-items-center text-center text-muted mb-3`}>
              Hello there! 👋 I'm Baizhu, your AI-driven health assistant here
              in Liyue. Simply describe your symptoms and I've got you covered.
            </Card.Subtitle>

            <Row>
              <Col md={10}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter your symptoms"
                  className={`${styles.description} text-muted mb-2`}>
                  <Form.Control
                    type="text"
                    name="query"
                    className={styles.description}
                    onChange={handleChange}
                    placeholder="Enter your symptoms"
                  />
                </FloatingLabel>
              </Col>
              <Col className="d-flex align-items-center">
                <Button
                  className={styles.button}
                  disabled={query === ""}
                  onClick={() => {
                    setLoading(true);
                    handleClick();
                  }}>
                  Submit
                </Button>
              </Col>
            </Row>

            <Row className={`${styles.text} mt-2`}>
              {loading && (
                <Row>
                  <Col className="d-flex justify-content-start align-items-center">
                    <img
                      src={loadingIcon}
                      alt="Result Icon"
                      style={{ width: "90px" }}
                    />
                    <Spinner
                      className={`${styles.loading} me-2`}
                      animation="border"
                    />
                    Checking symptoms...
                  </Col>
                </Row>
              )}

              {results && (
                <Row
                  className={`d-flex justify-content-start align-items-center`}>
                  <Col md={2}>
                    <img
                      src={resultIcon}
                      alt="Error Icon"
                      style={{ width: "90px" }}
                    />
                  </Col>
                  <Col>{results}</Col>
                </Row>
              )}

              {showError && (
                <Row
                  className={`${styles.error} d-flex justify-content-start align-items-center`}>
                  <img
                    src={errorIcon}
                    alt="Error Icon"
                    style={{ width: "90px" }}
                  />
                  Something went wrong with Baizhu. Please try again later.
                </Row>
              )}
            </Row>
          </Card.Body>
          <Card.Footer
            className={`${styles.disclaimer} text-center w-100 text-muted`}>
            <Row>
              The results provided by Baizhu are for informational purposes
              only. Please consult with a qualified health adviser or medical
              professional for personalized advice and treatment.
            </Row>
            <span className={styles.text}>
              Powered by Google Gemini. Copyright © Hoyoverse.
            </span>
          </Card.Footer>
        </Card>
      </Row>
    </Container>
  );
};

export default MainPage;
