import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const EditArticleForm = ({ showEditArticleForm, onCloseForm, selectedArticleId, handleArticles }) => {
    const [formData, setFormData] = useState({
        title: '',
        section: '',
        category: '',
        author: '',
        accessLevel: 'public',
    })


    const fetArticleData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/getarticle/${selectedArticleId}`);
            const articleData = response.data.data;
            setFormData(articleData)
        } catch (error) {
            console.log("Error in getartcile edit componenet", error)
        }
    }

    useEffect(() => {
        if (selectedArticleId) {
            // calling fetch data to prefill form only when we got selectedArtcile
            fetArticleData(selectedArticleId)
        }
    }, [selectedArticleId]);


    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     })
    // };

    const handleChange = (value, delta, source, editor) => {
        // If the event comes from ReactQuill, use value as the target value
        // Otherwise, assume it's a regular input and use the provided arguments
        const targetValue = editor ? value : value.target.value;
        const targetName = editor ? 'section' : value.target.name;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [targetName]: targetValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/editarticle/${selectedArticleId}`, formData);
            const updatedArticle = response.data.data;
            // onEditArticle(updatedArticle);
            handleArticles(updatedArticle)
            toast.success("Article Edited Succesfully")
            onCloseForm()
        } catch (error) {
            console.log("Error in editing article", error)
        }
    }




    return (
        <div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showEditArticleForm}
            >

                <Modal.Header closeButton onClick={onCloseForm}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit article
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

                        <div className="richtext">
                        <label>Section:</label>
                        {/* <textarea type="text" name="section" value={formData.section} onChange={handleChange} required /> */}
                        <ReactQuill
                                className="ReactQuill"
                                value={formData.section}
                                onChange={handleChange}
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, 3, 4, false] }],
                                        ["bold", "italic", "underline", "strike"],
                                        [{ list: "ordered" }, { list: "bullet" }],
                                        ["link", "image"],
                                        ["clean"],
                                        [{ align: [] }], 
                                    ],
                                }}
                                formats={[
                                    "header",
                                    "bold",
                                    "italic",
                                    "underline",
                                    "strike",
                                    "list",
                                    "bullet",
                                    "link",
                                    "image",
                                    'align'
                                ]}
                            />
                            </div>

                        <label>Category:</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="sports">Sports</option>
                            <option value="war">War</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="technology">Technology</option>
                            <option value="history">History</option>
                        </select>
                        <label>Author:</label>
                        <input type="text" name="author" value={formData.author} onChange={handleChange} required />

                        <label>Access Level:</label>
                        <select name="accessLevel" value={formData.accessLevel} onChange={handleChange} required>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>

                        <button type="submit">Edit Article</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditArticleForm