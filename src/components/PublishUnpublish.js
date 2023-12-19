import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const PublishUnpublish = ({onCloseForm, showPubuUnpubModel, selectedArticleId, handleArticles}) => {


    const [isPublished, setIsPublished] = useState();

    useEffect(() => {
        // fetch the current state if it is published or not
        const fetchCurrentState = async() => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/getarticle/${selectedArticleId}`);
                const currentState = response.data.data.published;
                // console.log("Printing data...", response.data.data.published)
                setIsPublished(currentState);
                console.log(isPublished)
            } catch (error) {
                console.log("Error in fetching data in Pub/unpub component", error)
            }
        }

        if(selectedArticleId) {
            fetchCurrentState();
        }
    }, [selectedArticleId])


    const handlePubUnpub = async() => {

        try {
            // const newCurrentState = !isPublished;

            const response = await axios.patch(`http://localhost:4000/api/v1/changepublish/${selectedArticleId}`);

            const updatedArticle = response.data.data;

            handleArticles(updatedArticle);
            {toast.success(`Article ${isPublished ? 'Unpublished' : "Published"} suceessfully`)}

            onCloseForm()
        } catch (error) {
            console.log("Error in publish unpublish component: ", error);

        }
    }
    


  return (
    <div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showPubuUnpubModel}
            >

            <Modal.Header closeButton onClick={onCloseForm}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isPublished ? 'UnPublish Article' : 'publish article'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure you want to {isPublished ? 'Unpublish' : "Publish"} the article?</p>
                
                <Button variant="primary" onClick={handlePubUnpub}>
                    {isPublished ? 'Unpublish' : 'Publish'}
                </Button>
            </Modal.Body>
            </Modal>
        </div>
  )
}

export default PublishUnpublish