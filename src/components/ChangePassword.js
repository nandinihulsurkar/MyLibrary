
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import LoggedInUser from "../contexts/LoggedInUser";

const ChangePassword = () => {

    const {liUserDetails, setLiUserDetails} = useContext(LoggedInUser);
    
    const [serverErrorMesg, setServerErrorMesg] = useState('');
    const [serverSuccessMesg, setServerSuccessMesg] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const defInputData = {old_pwd:'', new_pwd:'', retype_new_pwd:'', lin_user_id:liUserDetails['liUserId']};
    const [formData, setFormData] = useState(defInputData);
    const [formErrors, setFormErrors] = useState({});

    //console.log(formData);
    console.log('errors count === '+Object.keys(formErrors).length);
    useEffect(() => {
        
        setServerErrorMesg(''); setServerSuccessMesg('');
        if(isButtonClicked && Object.keys(formErrors).length == 0){
            const doChangePwdHere = async () => {
                const cpRes = await axios.post('http://localhost:8800/users/changePassword', formData);
                if(cpRes.data == 'Success'){
                    setServerSuccessMesg('Your password has been changed successfully.');
                    setFormData(defInputData);
                }
                else{
                    setServerErrorMesg(cpRes.data); 
                }
            }
            doChangePwdHere();
        }

    }, [formErrors]);

    const handleOnchange = (e) => {
        e.persist();
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleButtonClick = () => {
        setIsButtonClicked(true);

        setFormErrors ( validateTheForm(formData) );
    }

    const validateTheForm = (values) => {
        const errors = {};

        if(!values.old_pwd.trim())
            errors.old_pwd = "Please enter your old password.";
        else
        {      
            const chlOPHere = async () => {
                const isValidOP = await axios.post('http://localhost:8800/users/checkOldPassword', values);
                console.log(isValidOP);

                if(isValidOP.data == 'Incorrect Old Password')
                    errors.old_pwd = "Incorrect old password. Please check again.";                
            }
            chlOPHere();
        }

        if(!values.new_pwd.trim())
            errors.new_pwd = "Please enter your new password.";
        else if(values.new_pwd.length < 6 )
            errors.new_pwd = "Password should me of minimum 6 characters.";
        
        if(!values.retype_new_pwd.trim())
            errors.retype_new_pwd = "Please re-type your new password.";
        else if(values.new_pwd != values.retype_new_pwd)
            errors.retype_new_pwd = "New password and re-typed password does not match.";        

        return errors;
    }

    return(
        <div>
            <div className="flex justify-center mb-10">
                <img className="w-[60%] h-52" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT438tG5tC0WA8cyQufFJAbzSw_O4Ka-pR86Q&usqp=CAU"></img>
            </div>           
            {
                serverErrorMesg!='' ? <div className="flex justify-center text-center"><div></div><div className="w-auto px-10 py-2 mb-2 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">                    
                    <div className="font-medium">{serverErrorMesg}</div>                    
                </div><div></div></div> : ''
            }
            {
                serverSuccessMesg!='' ? <div className="flex justify-center text-center"><div></div><div className="w-auto px-10 py-2 mb-2 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400" role="alert">                    
                    <div className="font-medium">{serverSuccessMesg}</div>                    
                </div><div></div></div> : ''
            }
            <div className=" flex justify-center min-h-[180px] w-[100%] px-5 border border-red-400 bg-gray-50 shadow-2xl rounded-xl">
                <div className="mr-10 mb-7 mt-5 w-80">
                    <label htmlFor="old_pwd" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                    <input type="password" id="old_pwd" name="old_pwd" value={formData.old_pwd} onChange={handleOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div className="text-red-500 ml-1 text-sm" >
                        {formErrors.old_pwd !='' ? formErrors.old_pwd : ''}
                    </div>
                    <input type="hidden" name='lin_user_id' value={formData.lin_user_id} />
                </div>
                <div className="mr-10 mb-7 mt-5 w-80">
                    <label htmlFor="new_pwd" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                    <input type="password" id="new_pwd" name="new_pwd" value={formData.new_pwd} onChange={handleOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div className="text-red-500 ml-1 text-sm" >
                        {formErrors.new_pwd !='' ? formErrors.new_pwd : ''}
                    </div>
                </div>
                <div className="mr-10 mb-7 mt-5 w-80">
                    <label htmlFor="retype_new_pwd" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Re-type New Password</label>
                    <input type="password" id="retype_new_pwd" name="retype_new_pwd" value={formData.retype_new_pwd} onChange={handleOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div className="text-red-500 ml-1 text-sm" >
                        {formErrors.retype_new_pwd !='' ? formErrors.retype_new_pwd : ''}
                    </div>
                </div>
                <div className="mr-1 mb-7 mt-9">
                    <button onClick={handleButtonClick} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full">
                        Submit
                    </button>
                </div>
            </div>           
        </div>
    )
}

export default ChangePassword;