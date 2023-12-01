
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import plusSymbolImg from "../../images/plus_here.png";
import editPencilImg from "../../images/edit.png";
import { Link } from "react-router-dom";

const ManageBooks = () => {
    
    const [booksList, setBooksList] = useState([]);
    const [searchedBooksList, setSearchedBooksList] = useState(booksList);
    useEffect(() => {
        const getBooksHere = async () => {
            const books = await axios.get('http://localhost:8800/books');            
            setSearchedBooksList(books.data);
            setBooksList(books.data);            
        }
        getBooksHere();
    }, [])
    //console.log(searchedBooksList);

    const [suDefVal, setSuDefVal] = useState('');    
    const handleSearchOnChange = (e) => {        
        setSuDefVal(e.target.value);        
    }

    const handleSearchOnKeyup = () => {
        const searchedResult = booksList.filter(
            (sbList) => sbList.isbn.includes(suDefVal) || sbList.title.toLowerCase().includes(suDefVal.toLowerCase()) || sbList.author.toLowerCase().includes(suDefVal.toLowerCase()) || sbList.publisher.toLowerCase().includes(suDefVal.toLowerCase())
        )
        suDefVal == '' ? setSearchedBooksList(booksList) : setSearchedBooksList(searchedResult);
    }
    
    return(
        <div className="m-10 px-5 flex">
            <div className="w-[5%]"></div>
            <div  className="w-[90%]">
                <div className="mb-1">
                     
                </div>
                <div className="h-10 flex">
                    <div className="w-[50%]">
                        <input type='text' name='search_user' value={suDefVal} onChange={handleSearchOnChange} onKeyUp={handleSearchOnKeyup} placeholder="search book by ISBN, title, author, publisher" className="p-1 rounded-lg w-[420px] border border-red-400" />
                    </div>
                    <div className="w-[50%] flex justify-end mr-2">
                        <Link to='/admin/add-edit-book/0'>
                            <img className="w-8 h-8 rounded-lg cursor-pointer" title="All New Book" src={plusSymbolImg}></img>
                        </Link>
                    </div>
                </div>

                <div className="mb-5 border border-gray-300 shadow-lg">
                    <div className="bg-red-200 p-2">
                        <ul className="flex justify-start">
                            <li className="w-12">#</li>
                            <li className="w-14">Id</li>
                            <li className="w-44">ISBN</li>
                            <li className="w-44">Title</li>
                            <li className="w-44">Author</li>
                            <li className="w-44">Publisher</li>
                            <li className="">Actions</li>
                        </ul>
                    </div>

                    {
                        Object.keys(searchedBooksList).length == 0 ? <div className="p-2">
                            <ul className="flex justify-center items-center">
                                <li>-- No books to display --</li>
                            </ul>
                        </div> : 
                        searchedBooksList.map((bk, index) => (
                            <div key={bk.id} className="p-2">
                                <ul className="flex justify-start">
                                    <li className="w-12">{++index}</li>
                                    <li className="w-14">{bk.id}</li>
                                    <li className="w-44">{bk.isbn}</li>
                                    <li className="w-44">{bk.title}</li>
                                    <li className="w-44">{bk.author}</li>
                                    <li className="w-44">{bk.publisher}</li>
                                    <li className="">
                                    <Link to={'/admin/add-edit-book/'+bk.id}>
                                        <img className="w-8 h-8 rounded-lg cursor-pointer" title="Edit Book" src={editPencilImg}></img>
                                    </Link>
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                
                </div>
            </div>
            <div className="w-[5%] flex justify-end"></div>
        </div>
    )
}

export default ManageBooks;