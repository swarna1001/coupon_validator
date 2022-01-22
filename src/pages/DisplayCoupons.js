import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";

import axiosInstance from "../axios";

const DisplayCoupons = () => {

    const [couponDetails, setCouponDetails] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/all-coupons/`).then((res) => {
            setCouponDetails(res.data);
        });
    }, []);


    console.log(couponDetails);

    return (
        <div>
            <Container>
                <div className="mt-5 d-flex justify-content-end">
                    <Nav.Item>
                        <Nav.Link href="/create-coupon/" className="text-center">Add Coupon</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="/" className="text-center">Validate Coupon</Nav.Link>
                    </Nav.Item>
                </div>
                <h4 className="text-center mt-3 mb-5"> Available Coupons </h4>
                <Table striped hover>
                    <thead>
                        <tr>

                            <th>Coupon</th>
                            <th>Validity</th>
                            <th>% discount</th>
                            <th>FLAT discount</th>
                            <th>Minimum required Amount</th>


                        </tr>
                    </thead>
                    <tbody>
                        {couponDetails.map(coupon => (
                            <tr>
                                <td>{coupon.name}</td>
                                <td>{coupon.end_date}</td>
                                <td>{coupon.discount_percentage}</td>
                                <td>{coupon.discount_amount}</td>
                                <td>{coupon.minimum_cart_amount}</td>
                            </tr>
                        )
                        )}


                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default DisplayCoupons;