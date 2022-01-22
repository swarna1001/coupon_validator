import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import axiosInstance from "../axios";


const LandingPage = () => {

    const initialFormData = Object.freeze({
        cartAmount: "",
        couponCode: ""
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [emptyMessage, setEmptyMessage] = useState(false);
    const [showZeroOrNegativeMessage, setShowZeroOrNegativeMessage] = useState(false);
    const [validMessage, setValidMessage] = useState();
    const [amountDeductResponse, setAmountDeductResponse] = useState();
    const [notFoundError, setNotFoundError] = useState();
    const [error, setError] = useState(false);


    const handleFormChange = (e) => {

        setEmptyMessage(false);
        setShowZeroOrNegativeMessage(false);

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    //console.log(formData);

    const handleFormSubmit = (e) => {

        e.preventDefault();
        setEmptyMessage(false);
        setShowZeroOrNegativeMessage(false);
        setValidMessage("");
        setAmountDeductResponse("");
        setNotFoundError("");
        setError("")

        //console.log(formData);

        if (typeof formData === 'undefined' || typeof formData.cartAmount === 'undefined'
            || typeof formData.couponCode === 'undefined') {
            setEmptyMessage(true);
        }

        // eslint-disable-next-line
        else if (formData.cartAmount == "" || formData.couponCode == "") {
            setEmptyMessage(true);

        }

        else {
            if (formData.cartAmount > 0 && formData.couponCode) {

                axiosInstance
                    .post(`calculate-discount/?amount=${formData.cartAmount}&coupon_code=${formData.couponCode}`)
                    .then((res) => {

                        console.log(res.data);

                        if (res.data['valid']) {
                            setValidMessage(res.data['valid']);

                        }

                        if (res.data['amount_to_be_deducted']) {
                            setAmountDeductResponse(res.data['amount_to_be_deducted']);
                        }

                        // eslint-disable-next-line
                        if (res.status == "404") {
                            console.log("coupon not found");
                        }
                    })

                    .catch(err => {

                        if (err.response.data.detail) {
                            setNotFoundError(err.response.data.detail)
                        }
                        console.log(err);
                        setError(err.message);
                    });
            }

            else {
                setShowZeroOrNegativeMessage(true);
            }
        }
    }

    return (
        <div>
            <Container>
                <Row className="">
                    <Col className="mt-5">
                        <div className="justify-content-center">
                            <div className="mb-3 d-flex justify-content-end">
                                <Nav.Item>
                                    <Nav.Link href="/create-coupon/" className="text-center">Add Coupon</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link href="/all-coupons/" className="text-center">View Coupons</Nav.Link>
                                </Nav.Item>
                            </div>
                            <h4 className="text-center mt-5 mb-5"> <b> Hello, Let's get your coupons validated and help you save some of the money! </b> </h4>

                            <Form>
                                <Form.Group className="mt-5" controlId="cartAmount">
                                    <Form.Label>Cart Amount</Form.Label>
                                    <Form.Control
                                        type="number" name="cartAmount"
                                        placeholder="enter amount"
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>

                                {showZeroOrNegativeMessage ?
                                    <div className="mt-3">
                                        <span className="text-center form-validation-message">
                                            Cart amount cannot be 0 or negative!</span>

                                    </div>

                                    : <> </>}


                                <Form.Group className="mt-4" controlId="couponCode">
                                    <Form.Label>Coupon</Form.Label>
                                    <Form.Control
                                        placeholder="enter your coupon"
                                        name="couponCode"
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>

                                {emptyMessage ?
                                    <div className="mt-3">
                                        <span className="text-center form-validation-message">
                                            Please fill out the fields!</span>

                                    </div>

                                    : <> </>}


                                <div className="mt-3">
                                    <span className="mt-3 text-center form-success-message">
                                        {validMessage} </span>
                                </div>

                                <div className="mt-3">
                                    <span className="text-center form-success-message">
                                        {amountDeductResponse} </span>
                                </div>

                                <div className="mt-2">
                                    <span className="text-center form-validation-message">
                                        {notFoundError} </span>
                                </div>


                                {error &&
                                    <div className="d-flex justify-content-center mt-4 form-validation-message">
                                        <div>
                                            <h6><b> Something went wrong. Please try again! </b></h6>
                                        </div>
                                    </div>
                                }

                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="success" size="lg"
                                        className="mt-5"
                                        onClick={handleFormSubmit}
                                    >
                                        Check
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage;
