import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axiosInstance from "../axios";


const LandingPage = () => {
    return (
        <div>
            <Container>
                <Row className="">
                    <Col className="mt-5">
                        <div className="d-flex justify-content-center mt-5">
                            <h4>Welcome to the extraordinry, one of it's kind place to get your coupons validated!</h4>

                            <Form>

                            </Form>


                        </div>


                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage;
