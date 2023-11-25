import axios from "axios";
import { useState, useEffect } from "react";

const Register = () => {

    const [serverSuccessMesg, setServerSuccessMesg] = useState('');
    const [serverErrorMesg, setServerErrorMesg] = useState('');
    
    const defaultUserData = {
        full_name: "",
        mobile_no: "",
        pwd: "",
        conf_pwd: "",
    };
    
    const [userData, setUserData] = useState(defaultUserData);    
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    
    useEffect(() => {
        if(isSubmitClicked && Object.keys(formErrors).length === 0)
        {
            const userRegistrationHere = async () => {
                const urRes = await axios.post('http://localhost:8800/users/registration', userData);
                //console.log(urRes);
                if(urRes.data === 'Success'){
                    setServerErrorMesg('');
                    setServerSuccessMesg("Congratulations! You have been registered successfully.");
                    setUserData(defaultUserData);                    
                }
                else{
                    setServerSuccessMesg('');
                    setServerErrorMesg("OOPS.. Something went wrong. Try again after a while.");                    
                }
            }
            userRegistrationHere();          
        }
    }, [formErrors])

    const handleInputData = (e) => {
        e.persist();
        setUserData({...userData, [e.target.name] : e.target.value});
    }    

    const registerClickHandler = async (e) => {
        e.preventDefault();

        setFormErrors( validateForm(userData) );        
        
        setIsSubmitClicked(true);
    }

    const validateForm = (values) => {
        const errors = {};
        
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
                errors.mobile_no = "Only numbers are allowed for this field. Min & Max 10 numbers are required.";
            else if(values.mobile_no.length != 10)
                errors.mobile_no = "Min & Max 10 numbers are required.";
            else
            {
                const checkMNexists = async () => {
                    const mnRes = await axios.get('http://localhost:8800/users/checkMobileNoExists/'+values.mobile_no);
                    if(mnRes.data > 0)
                        errors.mobile_no = "Oops. This mobile number already exists.";
                }
                checkMNexists();
            }
        }

        if(!values.pwd.trim())
            errors.pwd  = "Please enter the password.";        
        else{

        }
        if(!values.conf_pwd.trim())
            errors.conf_pwd  = "Please re-enter the password.";        
        else if(values.conf_pwd != values.pwd)
            errors.conf_pwd  = "Password and Re-enter password does not match.";        

        return errors;
    }

    return(
        <div className="">
            <div className="flex justify-center mb-10">
                <img className="w-[60%] h-40" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-3RIH6sot99CawwIN37MEl9vBjIOVeOBWSg&usqp=CAU"></img>
            </div>
            
            {
                serverSuccessMesg!='' ? <div className="flex justify-center text-center"><div></div><div className=" w-[500px] p-2 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400" role="alert">                    
                    <div className="font-medium">{serverSuccessMesg}</div>                    
                </div><div></div></div> : ''
            }
            {
                serverErrorMesg!='' ? <div className="flex justify-center text-center"><div></div><div className=" w-[500px] p-2 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">                    
                    <div className="font-medium">{serverErrorMesg}</div>                    
                </div><div></div></div> : ''
            }

            <div className="w-[100%] mt-5 flex justify-center ">
                <div className="min-h-[220px] px-10 border border-red-400 bg-gray-50 shadow-2xl rounded-xl">
                    <div className="mt-5 mb-3 flex justify-center">
                        <div className="mr-10 w-72">
                            <label htmlFor="full_name" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                            <input type="text" id="full_name" name="full_name" value={userData.full_name} onChange={handleInputData} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                { formErrors.full_name != '' ? formErrors.full_name : ''}
                            </div>
                        </div>
                        <div className="w-72">
                            <label htmlFor="mobile_no" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Mobile No</label>
                            <input type="text" id="mobile_no" name="mobile_no" value={userData.mobile_no} onChange={handleInputData} maxLength='10' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                { formErrors.mobile_no != '' ? formErrors.mobile_no : ''}
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 flex justify-center">
                        <div className="mr-10 w-72">
                            <label htmlFor="pwd" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="pwd" name="pwd"  value={userData.pwd} onChange={handleInputData} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                { formErrors.pwd != '' ? formErrors.pwd : ''}
                            </div>
                        </div>
                        <div className="w-72">
                            <label htmlFor="conf_pwd" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Re-enter Password</label>
                            <input type="password" id="conf_pwd" name="conf_pwd" value={userData.conf_pwd} onChange={handleInputData} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                { formErrors.conf_pwd != '' ? formErrors.conf_pwd : ''}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-2">
                        <div>
                            <button onClick={registerClickHandler} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full">
                                Register Me
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Register;