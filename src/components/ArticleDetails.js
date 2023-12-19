// ArticleDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ArticleDetails = ({ handleArticles }) => {
    const [article, setArticle] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;

        const fetchArticleDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/getarticle/${id}`);
                setArticle(response.data.data);

                //updating the hits
                if (isMounted) {
                    const updatedHitsArticle = await axios.patch(`http://localhost:4000/api/v1/updatehits/${id}`);
                    console.log(updatedHitsArticle.data.data);

                    // update the state in app js so that table will be rendred with new values
                    handleArticles(updatedHitsArticle.data.data)
                }

            } catch (error) {
                console.error('Error fetching article details:', error);
            }
        };


        fetchArticleDetails();

        return () => {
            //cleanup function to set isMounted to false when the component is unmounted
            isMounted = false;
        };
    }, [id]);

    if (!article) {
        return <div>Loading...</div>; // You can add a loading indicator here
    }

    return (
        <div className='articlebody'>
            <div className='article'>
                <h1 className='articletitle'>{article.title}</h1>
                <h3 className='id'>ID: {article._id.slice(-8)}</h3>
                <p className='Category'>Category: {article.category}</p>
                {/* <p className='section'>Section: {article.section}</p> */}

                <p>Section:</p>
                <ReactQuill
                    readOnly={true}
                    value={article.section}
                    modules={{ toolbar: false }}
                    className="custom-quill"
                />
                <p className='access'>Access: {article.accessLevel}</p>
                <p className='author'>Author: {article.author}</p>
            </div>
        </div>
    );
};

export default ArticleDetails;