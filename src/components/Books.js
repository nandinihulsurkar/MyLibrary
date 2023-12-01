
import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import axios from "axios";

import { NODEJS_BASE_URL } from '../utils/Constants';

const Books = () => {
        
    const [searchedBookList, setSearchedBookList] = useState([]);
    const [searchText, setSearchText] = useState('');
    
    useEffect(() => {

        const getBooksHere = async () => {
            const getBooks = await axios.get(NODEJS_BASE_URL+'books/');
            setSearchedBookList(getBooks.data);
        }
        getBooksHere();

    }, [])
    
    return(
        <div>
            <div className="w-[100%] mt-5 flex justify-center">   
                <div>
                    <input className="w-[500px] h-10 border border-gray-500 px-4 my-3 rounded-l-full shadow-md" 
                        placeholder="Search by authors name" autoComplete="false" type="text" name="search-txt" value={searchText} 
                        onChange={(e) => {
                            setSearchText(e.target.value);       
                        }}
                        onKeyUp={() => {
                            setSearchText(searchText);
                        }}                            
                    ></input>
                </div>             
                <div className="w-14 h-10 border border-gray-500 px-3 py-2 my-3 rounded-r-full shadow-md cursor-pointer" 
                    onClick={() => {
                        setSearchText(searchText);                            
                    }}
                >
                    <img className="w-6 h-6 mr-1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXKCH9X46nhHAOkMyjScXb8nEggGys0wmZ7w&usqp=CAU"></img>
                </div>
            </div>
            <div className="m-5 flex flex-wrap justify-center">
            {
                searchedBookList.length > 0 ? searchedBookList.filter(
                    (serRes)=> serRes.author.toLowerCase().includes(searchText.toLowerCase()) || serRes.title.toLowerCase().includes(searchText.toLowerCase()) || serRes.language.toLowerCase().includes(searchText.toLowerCase())
                ).map((book) => (
                    <BookCard key={book.id} BookData={book} />
                )) : ''
            }
            </div>
        </div>
    )
}

export default Books;