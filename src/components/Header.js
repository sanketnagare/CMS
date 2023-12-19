import React, { useState, useEffect } from 'react'
import CreateArticleForm from './CreateArticleForm'
import plusicon from '../assets/plus.png'
import editicon from '../assets/edit.png'
import deleteicon from '../assets/delete.png'
import publishicon from '../assets/publish.png'
import unpublishicon from '../assets/unpublish.png'
import checkouticon from '../assets/checkout.png'

import EditArticleForm from './EditArticleForm';
import DeleteConfirmation from './DeleteConfirmation'
import PublishUnpublish from './PublishUnpublish'
import Checkout from './Checkout'


const Header = ({ articles, onCreateArticle, selectedArticleIds, handleArticles, handleMultipleArticles, onCategoryChange }) => {
    const [showCreateArticleForm, setShowCreateArticleForm] = useState(false);
    const [showEditArticleForm, setShowEditArticleForm] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [showPubuUnpubModel, setShowPubuUnpubModel] = useState(false);

    const [showCheckoutModel, setShowCheckoutModel] = useState(false);

    //   filter dropdown
    const [selectedCategory, setSelectedCategory] = useState('All');
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        onCategoryChange(category);
    };

    useEffect(() => {
        // Trigger the handleCategoryChange function when the component mounts
        handleCategoryChange({ target: { value: 'All' } });
    }, []);


    const [selectedArticleId, setSelectedArticleId] = useState(null);

    const handleCreateArticleClick = () => {
        setShowCreateArticleForm(true);
    };

    const handleEditArticleClick = () => {
        // console.log("Selected Article ID:", selectedArticleIds);
        if (selectedArticleIds.length === 1) {
            setShowEditArticleForm(true);
        } else if (selectedArticleIds.length > 1) {
            alert("Please select only one article to edit");
        } else {
            alert("Please select a article to edit");
        }
    }

    const handlePubUnpubModel = () => {
        if (selectedArticleIds.length > 0) {
            setShowPubuUnpubModel(true);
        }
        else {
            alert("Please select atleast one article.")
        }
    }

    const handleDeleteArticleClick = () => {
        if (selectedArticleIds.length > 0) {
            setShowDeleteModel(true);
        }
        else {
            alert("Please select a article to delete")
        }
    }

    const handleCheckout = () => {
        if(selectedArticleIds.length > 0) {
            setShowCheckoutModel(true);
        }
        else{
            alert("Please select atleast one article to checkout")
        }
    }

    const handleCloseForm = () => {
        setShowCreateArticleForm(false);
        setShowEditArticleForm(false);
        setShowDeleteModel(false);
        setShowPubuUnpubModel(false);
        setShowCheckoutModel(false);
        // after closing the form reset the selected article to null
        setSelectedArticleId(null);
    };



    return (
        <div className='headerbody'>
            <div className='mainheader'>
                <div className='title'>Content managment system</div>
                <div className='icon-container'>

                    <div className='iconandlable'>
                        <img className='icons' src={plusicon} onClick={handleCreateArticleClick} alt='plusicon' />
                        <label>Create</label>
                    </div>

                    <div className='iconandlable'>
                        <img className='icons' src={editicon} onClick={handleEditArticleClick} alt='editicon' />
                        <label>Edit</label>
                    </div>

                    <div className='iconandlable'>
                        <img className='icons' src={deleteicon} onClick={handleDeleteArticleClick} alt='deleteicon' />
                        <label>Delete</label>
                    </div>

                    <div className='iconandlable'>
                        <img className='icons' src={publishicon} onClick={handlePubUnpubModel} alt='publishicon' />
                        <label>Publish</label>
                    </div>

                    <div className='iconandlable'>
                        <img className='icons' src={unpublishicon} onClick={handlePubUnpubModel} alt='unpublishicon' />
                        <label>Unpublish</label>
                    </div>

                    <div className='iconandlable'>
                        <img className='icons' src={checkouticon} onClick={handleCheckout} alt='checkouticon' />
                        <label>Checkout</label>
                    </div>
                </div>
                {showCreateArticleForm && (
                    <CreateArticleForm
                        onCreateArticle={onCreateArticle}
                        onCloseForm={handleCloseForm}
                        showCreateArticleForm={showCreateArticleForm}
                    />
                )}
                {showEditArticleForm && (
                    <EditArticleForm
                        onCloseForm={handleCloseForm}
                        showEditArticleForm={showEditArticleForm}
                        selectedArticleId={selectedArticleIds[0]}
                        handleArticles={handleArticles}
                    />
                )
                }
                {showDeleteModel && (
                    <DeleteConfirmation
                        onCloseForm={handleCloseForm}
                        showDeleteModel={showDeleteModel}
                        selectedArticleIds={selectedArticleIds}
                        handleMultipleArticles={handleMultipleArticles}
                    />
                )
                }
                {
                    showPubuUnpubModel && (
                        <PublishUnpublish
                            onCloseForm={handleCloseForm}
                            showPubuUnpubModel={showPubuUnpubModel}
                            selectedArticleId={selectedArticleIds[0]}
                            handleArticles={handleArticles}
                        />
                    )
                }

                {showCheckoutModel && (
                    <Checkout
                        onCloseForm={handleCloseForm}
                        showCheckoutModel={showCheckoutModel}
                        selectedArticleIds={selectedArticleIds}
                        handleMultipleArticles={handleMultipleArticles}
                        articles={articles}
                    />
                )}

            </div>


            <div>
                <label>Filter by Category:</label>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option defaultChecked value='All'>All</option>
                    <option value="sports">Sports</option>
                    <option value="war">War</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="technology">Technology</option>
                    <option value="history">History</option>
                </select>
            </div>



        </div>
    );
};

export default Header