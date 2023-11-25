import { useState } from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
    //console.log(window.location.pathname);
    const [selectedMenu, setSelectedMenu] = useState(window.location.pathname);

    return(
        <div className="sticky top-0 z-50">
            <div className="flex w-[100%] bg-white h-16 shadow-md">
                <div className="w-[30%] flex px-1 py-2 font-extrabold text-2xl cursor-pointer ">
                    <div className="w-10 h-10 mr-1">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5vfyx03I4j0KMm4Npx1ry0FdqD5jhuvu_kf0Asye8ZpxhiFspzG09wRiDj0YyQsz36mo&usqp=CAU"></img>
                    </div>
                    <div className="mt-1">
                        <span className="text-red-500">The </span> Library - <span className="text-green-500 text-lg">Administrator </span>
                    </div>
                </div>
                <div className="w-[60%] pt-4 flex justify-start">   
                    <ul className="flex justify-center">
                    {
                        selectedMenu=="/home" ? <Link><li className={"mx-5 cursor-pointer px-3 py-1 rounded-full border border-red-500"} onClick={() => setSelectedMenu('/home')}>
                            Home
                        </li></Link> : <Link><li className={"mx-5 cursor-pointer rounded-full px-3 py-1 border hover:border-red-500"} onClick={()=>setSelectedMenu('/home')}>
                            Home
                        </li></Link>                  
                    }
                    {
                        selectedMenu=="/admin/manage-users" ? <Link to="/admin/manage-users"><li className={"mx-5 cursor-pointer px-3 py-1 rounded-full border border-red-500"} onClick={() => setSelectedMenu('/admin/manage-users')}>
                            Manage Users
                        </li></Link> : <Link to="/admin/manage-users"><li className={"mx-5 cursor-pointer rounded-full px-3 py-1 border hover:border-red-500"} onClick={()=>setSelectedMenu('/admin/manage-users')}>
                            Manage Users
                        </li></Link>                  
                    }
                    {
                        selectedMenu=="/admin/manage-books" ? <Link to="/admin/manage-books"><li className={"mx-5 cursor-pointer px-3 py-1 rounded-full border border-red-500"} onClick={() => setSelectedMenu('/admin/manage-books')}>
                            Manage Books
                        </li></Link> : <Link to="/admin/manage-books"><li className={"mx-5 cursor-pointer rounded-full px-3 py-1 border hover:border-red-500"} onClick={()=>setSelectedMenu('/admin/manage-books')}>
                            Manage Books
                        </li></Link>                  
                    }                                                                              
                    </ul>
                </div>        
                <div className="w-[10%] pr-4 py-4 flex justify-end">
                    <span className="w-9 h-9 pl-3 pt-1 cursor-pointer rounded-full bg-red-500 font-semibold text-white text-lg">A</span>
                </div>
            </div>                     
        </div>
    )
}

export default AdminHeader;