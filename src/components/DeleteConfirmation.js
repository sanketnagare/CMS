import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteConfirmation = ({selectedArticleIds, showDeleteModel, onCloseForm, handleMultipleArticles}) => {


    const handleDeleteConfirm = async () => {
        console.log(selectedArticleIds)
        try {
          // Iterate over each selected article ID and send delete request
          for (const articleId of selectedArticleIds) {
            console.log(articleId)
            const deleteresponse =await axios.delete(`http://localhost:4000/api/v1/deletearticle/${articleId}`);
            console.log(deleteresponse)
          }
    
          // Fetch updated articles after deletion
          const response = await axios.get('http://localhost:4000/api/v1/getallarticles');
          const updatedArticles = response.data.data;
          console.log("Inside getting..", updatedArticles)
          toast.info("Records deleted from database")
          handleMultipleArticles(updatedArticles);
        } catch (error) {
          console.error('Error deleting articles:', error);
        }
    
        // Close the delete confirmation modal
        onCloseForm();
      };


  return (
    <div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showDeleteModel}
            >

            <Modal.Header closeButton onClick={onCloseForm}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete confirmation
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure to delete these articles
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseForm}>
                Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirm}>
                Delete
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
  )
}

export default DeleteConfirmation