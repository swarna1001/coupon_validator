import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import axiosInstance from "../axios";

const CreateCoupon = () => {

    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    const minDate = tomorrow.toISOString().split("T")[0]

    const [formData, updateFormData] = useState(initialFormData);
    const [showPercentageErrorMsg, setShowPercentageErrorMsg] = useState(false);
    const [showmaximumPercentageDiscountAmountErrorMsg, setShowmaximumPercentageDiscountAmountErrorMsg] = useState(false);

    const [showNegativeZeroErrorMsg, setShowNegativeZeroErrorMsg] = useState(false);
    const [couponTypeNotSelectedErrorMsg, setCouponTypeNotSelectedErrorMsg] = useState(false);

    const [showDiscountAmountErrorMsg, setShowDiscountAmountErrorMsg] = useState(false);
    const [showDiscountAmountBox, setShowDiscountAmountBox] = useState(false);
    const [showDiscountPercentageBox, setShowDiscountPercentageBox] = useState(false);
    const [emptyMessage, setEmptyMessage] = useState(false);
    const [showCouponAlreadyExistsError, setShowCouponAlreadyExistsError] = useState();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState(false);

    const initialFormData = Object.freeze({
        name: "",
        endDate: "",
        couponType: "",
        discountPercentage: "",
        discountAmount: "",
        maximumPercentageDiscountAmount: "",
        minimumCartAmount: ""
    });


    const handleChange = (e) => {

        setShowPercentageErrorMsg(false);
        setShowDiscountAmountErrorMsg(false);
        setEmptyMessage(false);
        setShowCouponAlreadyExistsError("");
        setCouponTypeNotSelectedErrorMsg(false);

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });

        // eslint-disable-next-line
        if ([e.target.name] == "couponType" && [e.target.value] == 1) {
            setShowDiscountAmountBox(true)
            setShowDiscountPercentageBox(false)
            setShowPercentageErrorMsg(false);
            setShowDiscountAmountErrorMsg(false);
            setShowmaximumPercentageDiscountAmountErrorMsg(false);

            updateFormData({
                ...formData,
                discountPercentage: 0,
                maximumPercentageDiscountAmount: 0,
                couponType: 1,
            });

        }

        // eslint-disable-next-line
        else if ([e.target.name] == "couponType" && [e.target.value] == 2) {
            setShowDiscountPercentageBox(true)
            setShowDiscountAmountBox(false)
            setShowPercentageErrorMsg(false);


            updateFormData({
                ...formData,
                discountAmount: 0,
                couponType: 2,
            });
        }
    };

    const handleChange2 = (e) => {
        setEmptyMessage(false);
        setShowSuccessMessage(false);
        setShowDiscountAmountErrorMsg(false);
        setShowmaximumPercentageDiscountAmountErrorMsg(false);
        setShowNegativeZeroErrorMsg(false);
        setCouponTypeNotSelectedErrorMsg(false);

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    //console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPercentageErrorMsg(false);
        setShowDiscountAmountErrorMsg(false);
        setEmptyMessage(false);
        setShowCouponAlreadyExistsError("");
        setShowSuccessMessage(false);
        setShowmaximumPercentageDiscountAmountErrorMsg(false);
        setCouponTypeNotSelectedErrorMsg(false);

        if (typeof formData === 'undefined' || typeof formData.name === 'undefined' || typeof formData.minimumCartAmount === 'undefined'
            || typeof formData.endDate === 'undefined' || typeof formData.couponType === 'undefined') {
            setEmptyMessage(true)
        }

        else {

            if (formData.discountPercentage > 0 && formData.discountPercentage < 101) {
                setShowPercentageErrorMsg(false);
            }
            else {
                // eslint-disable-next-line
                if (formData.couponType == 2) {
                    setShowPercentageErrorMsg(true);
                }
            }

            if (formData.minimumCartAmount <= 0) {
                setShowNegativeZeroErrorMsg(true);
            }

            // eslint-disable-next-line
            if (formData.discountAmount <= 0 && formData.couponType == 1) {
                setShowDiscountAmountErrorMsg(true);
            }

            // eslint-disable-next-line
            if (formData.maximumPercentageDiscountAmount <= 0 && formData.couponType == 2) {
                setShowmaximumPercentageDiscountAmountErrorMsg(true);
            }

            if (typeof formData.discountAmount === 'undefined') {
                setEmptyMessage(true);
            }

            if (typeof formData.maximumPercentageDiscountAmount === 'undefined') {
                setEmptyMessage(true);
            }

            // eslint-disable-next-line
            if (formData.couponType == "") {
                setCouponTypeNotSelectedErrorMsg(true);
            }

            // eslint-disable-next-line
            if ((formData.name && formData.minimumCartAmount > 0 && formData.endDate) &&
                (formData.couponType == 1 || formData.couponType == 2) &&
                ((formData.discountPercentage && formData.maximumPercentageDiscountAmount) || formData.discountAmount)) {

                if (formData.discountAmount > 0 || (formData.maximumPercentageDiscountAmount > 0 && (formData.discountPercentage > 0 && formData.discountPercentage < 101))) {
                    axiosInstance
                        .post(`create-coupon/`, {
                            name: formData.name,
                            end_date: formData.endDate,
                            coupon_type: formData.couponType,
                            discount_percentage: formData.discountPercentage,
                            discount_amount: formData.discountAmount,
                            maximum_percentage_discount_amount: formData.maximumPercentageDiscountAmount,
                            minimum_cart_amount: formData.minimumCartAmount

                        })
                        .then((res) => {
                            // eslint-disable-next-line
                            if (res.status == "201") {
                                setShowSuccessMessage(true);
                            }

                            // eslint-disable-next-line
                            else if (res.status == "400") {
                                console.log("BAD REQUEST");
                            }

                        })

                        .catch(err => {
                            if (err.response.data.name) {
                                //console.log(err.response.data.password[0])
                                setShowCouponAlreadyExistsError(err.response.data.name[0]);
                            }
                            else {
                                //console.log(err.message);
                                setError(err.message);
                            }
                        });
                }
            }

        }
    };


    return (
        <div>
            <Container>
                <Row>
                    <Col className="mt-4">
                        <div className="mt-2 d-flex justify-content-end">
                            <Nav.Item>
                                <Nav.Link href="/" className="text-center">Validate Coupon</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href="/all-coupons/" className="text-center">View Coupons</Nav.Link>
                            </Nav.Item>
                        </div>

                        <Form >
                            <Form.Group className="mt-3" controlId="name">
                                <Form.Label>Coupon name</Form.Label>
                                <Form.Control
                                    placeholder="enter a coupon name"
                                    name="name"
                                    onChange={handleChange2}
                                />
                            </Form.Group>

                            <div className="mt-3">
                                <span className="text-center form-validation-message">
                                    {showCouponAlreadyExistsError} </span>
                            </div>


                            <Form.Group className="mt-3" controlId="minimumCartAmount">
                                <Form.Label>Minimum Cart Amount</Form.Label>
                                <Form.Control
                                    type="number" name="minimumCartAmount"
                                    onChange={handleChange2}
                                />
                            </Form.Group>

                            {showNegativeZeroErrorMsg ?
                                <div className="mt-3">
                                    <span className="text-center form-validation-message">
                                        Amount cannot be 0 or negative! </span>
                                </div>
                                : <> </>}


                            <Form.Group className="mt-3" controlId="endDate">
                                <Form.Label>Valid till</Form.Label>
                                <Form.Control type="date" name="endDate" placeholder="end date" required
                                    min={minDate} onChange={handleChange2} />
                            </Form.Group>


                            <Form.Label className="mt-3">Coupon type</Form.Label>
                            <Form.Select
                                name="couponType"
                                aria-label="Default select example"
                                onChange={handleChange}>

                                <option value=" " className="">
                                    select the coupon type
                                </option>

                                <option value="1" className="">
                                    FLAT
                                </option>
                                <option value="2" className="">
                                    PERCENTEAGE
                                </option>

                            </Form.Select>

                            {couponTypeNotSelectedErrorMsg ?
                                <div className="mt-3">
                                    <span className="text-center form-validation-message">
                                        Select a valid coupon type!</span>

                                </div>
                                : <> </>}

                            {showDiscountPercentageBox ?
                                <div>
                                    <Form.Group className="mt-3" controlId="discountPercentage">
                                        <Form.Label>Discount Percentage</Form.Label>
                                        <Form.Control
                                            as="input"
                                            type="number" name="discountPercentage" min={1} max={100}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>

                                : <> </>}

                            {showPercentageErrorMsg ?
                                <div className="mt-3">
                                    <span className="text-center form-validation-message">
                                        Make sure the value is between 1 and 100! </span>

                                </div>

                                : <> </>}



                            {showDiscountPercentageBox ?
                                <div>
                                    <Form.Group className="mt-3" controlId="maximumPercentageDiscountAmount">
                                        <Form.Label>Maximum Discount Amount</Form.Label>
                                        <Form.Control
                                            type="number" name="maximumPercentageDiscountAmount"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>

                                : <> </>}

                            {showmaximumPercentageDiscountAmountErrorMsg ?
                                <div className="mt-3">
                                    <span className="text-center form-validation-message">
                                        Discount Amount cannot be negative or zero!</span>
                                </div>

                                : <> </>}


                            {showDiscountAmountBox ?

                                <div>
                                    <Form.Group className="mt-3" controlId="discountAmount">
                                        <Form.Label>Discount Amount</Form.Label>
                                        <Form.Control
                                            type="number" name="discountAmount" min="1"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>


                                </div>

                                : <> </>}


                            {showDiscountAmountErrorMsg ?
                                <div className="mt-3">
                                    <span className="text-center form-validation-message">
                                        Discount Amount cannot be negative or zero!</span>
                                </div>

                                : <> </>}


                            {emptyMessage ?
                                <div className="mt-3">
                                    <span className="text-center form-validation-message">
                                        Please fill out the fields!</span>

                                </div>

                                : <> </>}


                            {showSuccessMessage ?
                                <div className="mt-3">
                                    <span className="text-center form-success-message">
                                        New coupon successfully created!</span>
                                </div>

                                : <> </>}


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
                                    onClick={handleSubmit}
                                >
                                    Create
                                </Button>
                            </div>
                        </Form>

                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default CreateCoupon;