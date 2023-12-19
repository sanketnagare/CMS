import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const Table = ({ articles, onArticleSelect }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    // console.log(selectedRows, "sanket");

    const [searchText, setSearchText] = useState('');
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };


    const filteredArticles = articles.filter(
        (article) =>
            article.title.toLowerCase().includes(searchText.toLowerCase()) ||
            article.category.toLowerCase().includes(searchText.toLowerCase()) ||
            article.author.toLowerCase().includes(searchText.toLowerCase())
        // fields as needed for searching
    );

    const handleSelectArticle = (articleIds) => {
        setSelectedRows(articleIds);
    };

    const handleRows = (state) => {
        const selectedArticleIds = state.selectedRows?.map((row) => row._id) || [];
        handleSelectArticle(selectedArticleIds);
        onArticleSelect(selectedArticleIds);
    };


    const columns = [
        {
            name: 'ID',
            selector: '_id',
            sortable: true,
            cell: (row) => row._id.slice(-8)
        },
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
            cell: (row) => <Link to={`/details/${row._id}`}>{row.title}</Link>,
        },
        {
            name: 'Published',
            selector: 'published',
            sortable: true,
            cell: (row) => (row.published ? 'Yes' : 'No')
        },
        {
            name: 'Access Level',
            selector: 'accessLevel',
            sortable: true
        },
        {
            name: 'Section',
            selector: 'section',
            sortable: true,
            width: '150px'
        },
        {
            name: 'Category',
            selector: 'category',
            sortable: true
        },
        {
            name: 'Author',
            selector: 'author',
            sortable: true
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            cell: (row) => new Date(row.date).toLocaleString()
        },
        {
            name: 'Hits',
            selector: 'hits',
            sortable: true,
        }
    ];


    const customStyles = {
        headRow: {
            style: {
                fontSize: '14px',
                backgroundColor: 'lightblue',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
            },
        },
        rows: {
            style: {
                borderTop: '1px solid lightgrey',
                fontSize: '16px',
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #ccc',
            },
        },
    };

    return (
        <div className='tablebody'>
            <div className='search-container'>
                <label htmlFor='searchbar'>Filter: </label>
                <input
                    id='searchbar'
                    type='text'
                    placeholder='Search...'
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='table'>
                <DataTable
                    // title = "Article Table"
                    columns={columns}
                    data={filteredArticles}
                    selectableRows
                    onSelectedRowsChange={handleRows}
                    highlightOnHover
                    pagination
                    selectableRowsVisibleOnly
                    fixedHeader
                    customStyles={customStyles}
                    paginationPerPage={6}
                    paginationRowsPerPageOptions={[6, 10, 20]}
                    // expandableRowsComponent={<Link to='/details'>View Details</Link>}
                />
            </div>
        </div>
    )
}

export default Table