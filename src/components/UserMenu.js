import { Link } from 'react-router-dom';
import { useContext } from 'react';

import LoggedInUser from '../contexts/LoggedInUser';

const UserMenu = ({showUM, manageUserIconClick}) => {
    
    const {liUserDetails, setLiUserDetails} = useContext(LoggedInUser);    

    const doLogoutHere = () => {
        window.location.href = "http://localhost:1234/";
    }

    const manageUserMenuClick = () => {
        manageUserIconClick();
    }

    return(
        <div>
        {
            liUserDetails['isUserLoggedin'] && showUM ? 
            <div className="flex h-12 justify-end mb-2">
                <ul className="flex justify-center mt-1">
                    <Link to="/update-profile">
                        <li onClick={manageUserMenuClick} className="px-4 py-2 mr-1 cursor-pointer border border-red-200 rounded-full hover:bg-red-100">Update Profile </li> 
                    </Link>

                    <Link to="/change-password">
                        <li onClick={manageUserMenuClick} className="px-4 py-2 mr-1 cursor-pointer border border-red-200 rounded-full hover:bg-red-100">Change Password </li>
                    </Link>

                    <Link to="/update-profile">
                        <li className="px-4 py-2 mr-1 cursor-pointer border border-red-200 rounded-full hover:bg-red-100">My Books </li>
                    </Link>

                    <li className="px-4 py-2 mr-1 cursor-pointer border border-red-200 rounded-full hover:bg-red-100" onClick={doLogoutHere}>Logout</li>
                </ul>           
            </div> : ''
        }
        </div>
    )
};

export default UserMenu;