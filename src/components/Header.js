
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoggedInUser from "../contexts/LoggedInUser";
import UserMenu from "./UserMenu";

const Header = () => {
    
    const [selectedMenu, setSelectedMenu] = useState(window.location.pathname);

    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const {liUserDetails, setLiUserDetails} = useContext(LoggedInUser);
    const liuFL = liUserDetails['liUserFullname'].charAt(0);
    
    const manageUserIconClick = () => {
        showUserMenu ? setShowUserMenu(false) : setShowUserMenu(true);
    }
    
    return(
        <div className="sticky top-0 z-50">
            <div className="flex bg-white h-16 shadow-md">
                {/*<div className="px-1 py-2 cursor-pointer" >
                    <img className="w-10 h-10" src={menuImg} alt="menu image" onClick={updateShowMenu}></img>
                </div>*/}
                <div className="flex px-1 py-2 font-extrabold text-2xl cursor-pointer">
                    <div className="w-10 h-10 mr-1">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5vfyx03I4j0KMm4Npx1ry0FdqD5jhuvu_kf0Asye8ZpxhiFspzG09wRiDj0YyQsz36mo&usqp=CAU"></img>
                    </div>
                    <div className="mt-1">
                        <span className="text-red-500">The </span> Library
                    </div>
                </div>
                <div className="w-[75%] pt-4 flex justify-center ">   
                    <ul className="flex justify-center">
                    {
                        selectedMenu=="/" ? <Link to="/"><li className={"mx-5 cursor-pointer border border-white rounded-full px-3 py-1 bg-red-400" } onClick={() => setSelectedMenu('/')}>
                            Home
                        </li></Link> : <Link to="/"><li className={"mx-5 cursor-pointer border border-white rounded-full px-3 py-1 hover:bg-red-400" } onClick={()=>setSelectedMenu('/')}>
                            Home
                        </li></Link>                   
                    }
                    {
                        selectedMenu=="/books" ? <Link to="/books"><li className="mx-5 cursor-pointer border border-white rounded-full px-3 py-1 bg-red-400 " onClick={() => {setSelectedMenu('/books');}} >
                            Books
                        </li></Link> : <Link to="/books"><li className="mx-5 cursor-pointer border border-white rounded-full px-3 py-1 hover:bg-red-400" onClick={() => {setSelectedMenu('/books');}}>
                            Books
                        </li></Link>
                    }                
                    {
                        selectedMenu=="/authors" ? <Link to="/authors"><li className="mx-5 cursor-pointer border border-white rounded-full px-3 py-1 bg-red-400" onClick={()=> {setSelectedMenu('/authors');}} >
                            Authors
                        </li></Link> : <Link to="/authors"><li className="mx-5 cursor-pointer border border-white rounded-full px-3 py-1 hover:bg-red-400" onClick={()=> {setSelectedMenu('/authors');}} >
                            Authors
                        </li></Link>
                    }
                    {
                        !(liUserDetails['isUserLoggedin']) ? selectedMenu=="/login" ? <Link to="/login"><li className="mx-5 cursor-pointer border border-white rounded-full px-3 py-1 bg-red-400" onClick={()=>setSelectedMenu('/login')}>
                            Login
                        </li></Link> : <Link to="/login"><li className="mx-5 cursor-pointer border border-white rounded-full px-3 py-1 hover:bg-red-400" onClick={()=>setSelectedMenu('/login')}>
                            Login
                        </li></Link>
                        : ''
                    }
                    {
                        !(liUserDetails['isUserLoggedin']) ? selectedMenu=="/register" ? <Link to="/register"><li className="mx-5 cursor-pointer border border-white rounded-full px-3 py-1 bg-red-400" onClick={()=>setSelectedMenu('/register')}>
                            Register
                        </li></Link> : <Link to="/register"><li className="mx-5 cursor-pointer border border-white rounded-full px-3 py-1 hover:bg-red-400" onClick={()=>setSelectedMenu('/register')}>
                            Register
                        </li></Link>
                        : ''
                    }                        
                    </ul>
                </div>
                <div className="w-[10%] pr-4 py-4 flex justify-end" onClick={manageUserIconClick} >
                    <span className="w-9 h-9 pl-3 pt-1 cursor-pointer rounded-full bg-red-500 font-semibold text-white text-lg">{liuFL}</span>
                </div>
            </div>

            <UserMenu 
                showUM = {showUserMenu} 
                manageUserIconClick = {() => manageUserIconClick()}                  
            />          
        </div>
    )
};

export default Header;