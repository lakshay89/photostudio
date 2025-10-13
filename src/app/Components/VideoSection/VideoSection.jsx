"use client";
import { Container, Row, Col, Button } from "react-bootstrap";

const AcrylicPhoto = () => {
  return (
    <div
      style={{
        backgroundColor: "#14b8a6",
        color: "white",
        padding: "60px 0",
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Left Section - Video */}
          <Col md={6} className="text-center mb-4 mb-md-0">
            <div
              style={{
                backgroundColor: "#14b8a6",
                borderRadius: "30px",
                overflow: "hidden",
                padding: "10px",
              }}
            >
              {/* OMGS Logo */}
              

              {/* <h2 className="fw-bold text-dark mb-3">Ultra Clear Brilliance</h2> */}

              {/* Video Section */}
              <div className="d-flex justify-content-center border-rounded-1">
                <video
                  src="/videos/omgslandscape2.mp4"  // ✅ Remove /public from path
                  
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "10px",
                    borderTopLeftRadius: "150px",
                    borderBottomRightRadius: "150px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          </Col>

          {/* Right Section - Text and Button */}
          <Col md={6} className="text-center text-md-start">
            <h2 className="fw-bold mb-3">
               ACRYLIC PHOTO
            </h2>
            <p className="fs-5 text-light">
              Experience the brilliance and vibrancy of our acrylic prints,
              expertly crafted to bring your images to life. Create a captivating
              visual display that truly reflects your style and creates a lasting
              impression.
            </p>
            <Button
              variant="light"
              className="fw-bold px-4 py-2 rounded-pill mt-3"
            >
              Shop now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AcrylicPhoto;
