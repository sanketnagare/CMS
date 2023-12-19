import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";


const stripeLoader = loadStripe(
    process.env.KEY_FRONTEND
);


const Checkout = ({ selectedArticleIds, showCheckoutModel, onCloseForm, handleMultipleArticles, articles }) => {



    const handleCheckoutConfirm = async () => {
        try {
            const stripe = await stripeLoader;
            // fetched all selected articles using selectedArticlesIds from all articles
            const selectedArticles = articles.filter((article) =>
                selectedArticleIds.includes(article._id)
            );

            if (selectedArticles.length === 0) {
                alert("Please select at least one article to checkout")
            }
            console.log(selectedArticles);

            const checkOutData = {
                articles: selectedArticles.map((article) => ({
                    title: article.title,
                    price: 100,
                    quantity: 1,
                })),
                customerName: 'Sanket',
                customerAddress: 'Pune',
            };


            console.log("before call", checkOutData)
            const response = await axios.post(
                "http://localhost:4000/api/v1/create-checkout-session",
                checkOutData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).catch((error) => {
                console.error("Error in API call:", error);
                throw error;
            });

            console.log(response.data.id);


            if (!response.data.id) {
                console.error("Invalid sessionId received from the server");
                return;
            }

            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id,
            });

            if (result.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.error("Error in checkout", error);
        }
    }





    return (
        <div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showCheckoutModel}
            >

                <Modal.Header closeButton onClick={onCloseForm}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Checkout confirmation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure to checkout?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseForm}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleCheckoutConfirm}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Checkout