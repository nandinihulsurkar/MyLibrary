
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import LoggedInUser from "../contexts/LoggedInUser";

const UpdateProfile = () => {

    const {liUserDetails, setLiUserDetails} = useContext(LoggedInUser);

    const [serverErrorMesg, setServerErrorMesg] = useState('');
    const [serverSuccessMesg, setServerSuccessMesg] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const defInputData = {full_name:'', mobile_no:'', lin_user_id:liUserDetails['liUserId']};
    const [formData, setFormData] = useState(defInputData);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const udHere = async () => {
            const ud = await axios.get('http://localhost:8800/users/getUserInfo/'+liUserDetails['liUserId']);
            console.log(ud.data.full_name);
            setFormData({full_name:ud.data.full_name, mobile_no:ud.data.mobile_no, lin_user_id:liUserDetails['liUserId']})
        }
        udHere();
    }, [])

    const handleOnchange = (e) => {
        e.persist();
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleButtonClick = () => {
        setIsButtonClicked(true);

        setFormErrors ( validateTheForm(formData) );
    }

    const validateTheForm = (values) => {
        errors = {};

        if(!values.full_name.trim())
            errors.full_name = "Please enter your full name.";
        else{
            let nameRegEx = /^[a-zA-Z ]+$/;
            if(values.full_name.length <= 2)
                errors.full_name = "Min 3 characters required.";
            else if(!nameRegEx.test(values.full_name))
                errors.full_name = "Only alphabets and a space are allowed for this field.";
            
        }

        if(!values.mobile_no.trim())
            errors.mobile_no  = "Please enter your mobile number.";
        else{
            let cnoRegEx = /^[0-9]+$/;
            if(!cnoRegEx.test(values.mobile_no))
                errors.mobile_no = "Only numbers are allowed for this field.";
            else if(values.mobile_no.length != 10)
                errors.mobile_no = "Min & Max 10 numbers are required.";
            else
            {
                console.log(values);
                const checkMNexists = async () => {
                    const mnRes = await axios.get('http://localhost:8800/users/checkMobileNoExistsInUpdateProfile/'+values.mobile_no+'/'+values.lin_user_id);
                    if(mnRes.data == 'Mno Already Exists')
                        errors.mobile_no = "Oops. This mobile number already exists.";                   
                }
                checkMNexists();
            }
        }

        return errors;
    }

    useEffect(() => {

        setServerErrorMesg(''); setServerSuccessMesg('');
        if(isButtonClicked && Object.keys(formErrors).length == 0)
        {
            const updateProfileHere = async () => {
                const upResult = await axios.post('http://localhost:8800/users/updateProfile', formData);
                
                if(upResult.data == 'Serverside : Update Profile query failed.')
                    setServerErrorMesg('Oops.. Something went wrong..');                
                else{
                    setServerSuccessMesg('Your profile details are updated successfully.');
                    //setFormData(defInputData);
                }
                    
            }
            updateProfileHere();
        }

    }, [formErrors])

    return(
        <div className="">
            <div className="flex justify-center mb-10">
                <img className="w-[100%] h-40" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS452cH994cr8f18SrhLfzizU0aXvLs8uNZsw&usqp=CAU'></img>
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
            <div className="flex justify-center min-h-[140px] w-[100%] px-5 border border-purple-600 shadow-2xl rounded-xl">
                <div className="mr-10 mb-7 mt-5 w-80">
                    <label htmlFor="full_name" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleOnchange}  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div className="text-red-500 ml-1 text-sm" >
                        {formErrors.full_name !='' ? formErrors.full_name : ''}
                    </div>
                    <input type="hidden" name='lin_user_id' value={formData.lin_user_id} />
                </div>
                <div className="mr-10 mb-7 mt-5 w-80">
                    <label htmlFor="mobile_no" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                    <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleOnchange} maxLength='10' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div className="text-red-500 ml-1 text-sm" >
                        {formErrors.mobile_no !='' ? formErrors.mobile_no : ''}
                    </div>
                </div>
                <div className="mr-1 mb-7 mt-9">
                    <button onClick={handleButtonClick} className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full">
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile;