import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateArticleForm = ({
    onCreateArticle,
    onCloseForm,
    showCreateArticleForm,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        section: "",
        category: "sports",
        author: "",
        accessLevel: "public",
    });

    // store the initial HTML
    const [initialHTML, setInitialHTML] = useState("");
    useEffect(() => {
        // Update the initialHTML when formData.section changes
        setInitialHTML(formData.section);
    }, [formData.section]);

    // const handleChange = (value) => {
    //     // setFormData({
    //     //     ...formData,
    //     //     [e.target.name]: e.target.value,
    //     //     section: value,
    //     // });

    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         section: value,
    //     }));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Calling the parent component's function to handle article creation
        console.log("In from", formData)
        onCreateArticle(formData);
        // Clear the form data
        setFormData({
            title: "",
            section: "",
            category: "",
            author: "",
            accessLevel: "public",
        });
        onCloseForm();
    };

    return (
        <div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showCreateArticleForm}
            >
                <Modal.Header closeButton onClick={onCloseForm}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create New Article
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <div className="richtext">


                            <label>Section:</label>
                            {/* <textarea
                            type="text"
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            required
                        /> */}

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
                                ]}
                            />

                        </div>


                        <label>Category:</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="sports">Sports</option>
                            <option value="war">War</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="technology">Technology</option>
                            <option value="history">History</option>
                        </select>

                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />

                        <label>Access Level:</label>
                        <select
                            name="accessLevel"
                            value={formData.accessLevel}
                            onChange={handleChange}
                            required
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>

                        <button type="submit">Create Article</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreateArticleForm;
