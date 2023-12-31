
import { useState, useEffect } from "react";
import axios from "axios";

import { NODEJS_BASE_URL } from '../../utils/Constants';

const ManageUsers = () => {
    
    const [serverSuccessMsg, setServerSuccessMsg] = useState('');
    const [serverErrorMsg, setServerErrorMsg] = useState('');
    
    const [usersList, setUsersList] = useState([]);
    const [searchedUsersList, setSearchedUsersList] = useState(usersList);
    useEffect(() => {
        const getUsersHere = async () => {
            const users = await axios.get(NODEJS_BASE_URL+'users');            
            setSearchedUsersList(users.data);
            setUsersList(users.data);            
        }
        getUsersHere();
    }, [])
    

    const [suDefVal, setSuDefVal] = useState('');    
    const handleSearchOnChange = (e) => {        
        setSuDefVal(e.target.value);        
    }

    const handleSearchOnKeyup = () => {
        const searchedResult = usersList.filter(
            (suList) => suList.id == suDefVal || suList.full_name.toLowerCase().includes(suDefVal.toLowerCase()) || suList.mobile_no.includes(suDefVal) || suList.status.toLowerCase().includes(suDefVal.toLowerCase()) || suList.registered_on.toLowerCase().includes(suDefVal)
        )
        suDefVal == '' ? setSearchedUsersList(usersList) : setSearchedUsersList(searchedResult);
    }

    const handleTheStatusChange = (e) => {   
        //console.log(e.target.id+' - '+e.target.value);
        setServerSuccessMsg(''); setServerErrorMsg('');  
        if(confirm("are you sure, you want to change the status of this user ?"))
        {
            const updateUserStatusHere = async () => {
                const uusResult = await axios.get(NODEJS_BASE_URL+'users/changeUserStatus/'+e.target.id+'/'+e.target.value);
                if(uusResult.data == 'Success')
                    setServerSuccessMsg('User status has been updated successfully.');
                else
                    setServerErrorMsg(uusResult.data);
            }
            updateUserStatusHere();
        }
        else
        {
            if(e.target.value == 'Active')
                document.getElementById(e.target.id).value = 'Inactive';
            else
                document.getElementById(e.target.id).value = 'Active';
        }
    }
    
    return(
        <div>
            {
                serverErrorMsg!='' ? <div className="flex justify-center text-center"><div></div><div className="w-auto px-10 py-2 mt-5 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">                    
                    <div className="font-medium">{serverErrorMsg}</div>                    
                </div><div></div></div> : ''
            }
            {
                serverSuccessMsg!='' ? <div className="flex justify-center text-center"><div></div><div className="w-auto px-10 py-2 mt-5 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400" role="alert">                    
                    <div className="font-medium">{serverSuccessMsg}</div>                    
                </div><div></div></div> : ''
            }

            <div className="m-10 px-5 flex">
                <div className="w-[15%]"></div>
                <div  className="w-[70%]">
                    <div className="mb-1">
                        
                    </div>
                    <div className="h-10 flex items-center">
                        <input type='text' name='search_user' value={suDefVal} onChange={handleSearchOnChange} onKeyUp={handleSearchOnKeyup} placeholder="search user by id, name, mobile no, status or created date" className="p-1 rounded-lg w-[420px] border border-red-400" />
                    </div>

                    <div className="mb-5 border border-gray-300 shadow-lg">
                        <div className="bg-red-200 p-2">
                            <ul className="flex justify-start">
                                <li className="w-12">#</li>
                                <li className="w-12">Id</li>
                                <li className="w-44 mr-8">Full Name</li>
                                <li className="w-36">Mobile Number</li>
                                <li className="w-32">Status</li>
                                <li className="">Registered On</li>
                            </ul>
                        </div>

                        {
                            Object.keys(searchedUsersList).length == 0 ? <div className="p-2">
                                <ul className="flex justify-center items-center">
                                    <li>-- No data to display --</li>
                                </ul>
                            </div> : 
                            searchedUsersList.map((usr, index) => (
                                <div key={usr.id} className="p-2">
                                    <ul className="flex justify-start">
                                        <li className="w-12">{++index}</li>
                                        <li className="w-12">{usr.id}</li>
                                        <li className="w-44 mr-8">{usr.full_name}</li>
                                        <li className="w-36">{usr.mobile_no}</li>
                                        <li className="w-32">
                                            <select className="p-1 w-24 border border-gray-200" defaultValue={usr.status} onChange={handleTheStatusChange} id={usr.id}>                         
                                                <option value='Active'>Active</option>
                                                <option value='Inactive'>Inactive</option>
                                            </select>
                                        </li>
                                        <li className="">{usr.registered_on}</li>
                                    </ul>
                                </div>
                            ))
                        }
                    
                    </div>
                </div>
                <div className="w-[15%] flex justify-end"></div>
            </div>
        </div>
    )
}

export default ManageUsers;