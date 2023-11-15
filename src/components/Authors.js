
import AuthorCard from "./AuthorCard";
import { AuthorsList } from "../utils/MockData";
import { useState } from "react";

const Authors = () => {
    
    const [defaultAuthorsList, setDefaultAuthorsList] = useState(AuthorsList);
    const [searchedAuthorsList, setSearchedAuthorsList] = useState(defaultAuthorsList);
    
    const [searchText, setSearchText] = useState('');
    
    return(
        <div>
            <div>
                <img className="w-[100%] h-80" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTua3W546Lz7hRyk3g6GyGMTKPS3SFMsyohQg&usqp=CAU"></img>
            </div>
            <div className="w-[100%] mt-5 flex justify-center">   
                <div>
                    <input className="w-[500px] h-10 border border-gray-500 px-4 my-3 rounded-l-full shadow-md" 
                        placeholder="Search by authors name" type="text" name="search-txt" value={searchText} 
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
                searchedAuthorsList.filter(
                    (eachRec) => eachRec.name.toLowerCase().includes(searchText.toLowerCase()) || eachRec.duration.toLowerCase().includes(searchText.toLowerCase())
                ).map((aut) => (
                    <AuthorCard key={aut.id} authorData={aut} />
                ))
            }
            </div>
        </div>
    )
}

export default Authors;