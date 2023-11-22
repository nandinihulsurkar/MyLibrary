import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoggedInUser from "../contexts/LoggedInUser";

const Login = () => {

    const navigate = useNavigate();

    const {liUserDetails, setLiUserDetails} = useContext(LoggedInUser);
   
    const [formData, setFormData] = useState({
        mobile_no: '',
        pwd: ''
    });
    
    const [loginBtnClicked, setLoginBtnClicked] = useState(false);
    const [formValidationErrors, setFormValidationErrors] = useState({});

    const [serverErrorMesg, setServerErrorMesg] = useState('');
    
    useEffect(() => {
        setServerErrorMesg('');
        if(loginBtnClicked && Object.keys(formValidationErrors).length == 0){
            
            const loginHere = async () => {
                const goLogin = await axios.post('http://localhost:8800/users/login/', formData);
                
                if(goLogin.data == 'Error')
                    setServerErrorMesg('Oops.. Something went wrong..');
                else if(goLogin.data == 'Inactive')
                    setServerErrorMesg('Your account is De-activated due to some reasons. Please contact the administrator.');
                else{ 
                    const linu = {
                        isUserLoggedin : true,
                        liUserId: goLogin.data[0].id,
                        liUserFullname: goLogin.data[0].full_name,
                        liUserMno: goLogin.data[0].mobile_no,                
                    }
                    
                    setLiUserDetails(linu);
                    navigate("/");
                }
            }
            loginHere();            
        }

    }, [formValidationErrors]);

    const handleOnchange = (e) => {
        e.persist();
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleTheLoginClick = () => {
        setLoginBtnClicked(true);

        setFormValidationErrors( validateLoginForm(formData) );
    }

    const validateLoginForm = (values) => {
        const errors = {};

        let cnoRegEx = /^[0-9]+$/;
        if(!values.mobile_no)
            errors.mobile_no = 'Please enter your mobile number.';
        else if(!cnoRegEx.test(values.mobile_no))
            errors.mobile_no = "Only numbers are allowed for this field.";
        else if(values.mobile_no.length < 10)
            errors.mobile_no = "Min & Max 10 numbers are required.";
        else
        {
            try{
                const checkMNexists = async () => {
                    const mnRes = await axios.get('http://localhost:8800/users/checkMobileNoExists/'+values.mobile_no);
                    if(mnRes.data == 0)
                        errors.mobile_no = "Please enter your registered mobile number.";
                }
                checkMNexists();
            }
            catch(err) {
                console.log("Mobile number verification failed.");
            }            
        }
        
        if(!values.pwd)
            errors.pwd = 'Please enter the password.';

        if(values.pwd != '' && Object.keys(formValidationErrors).length === 0)
        {
            try{
                const checkForPwd = async () => {
                    const passRes = await axios.post('http://localhost:8800/users/checkIsValidPassword/', values);
                    if(passRes.data == "Incorrect Password")
                        errors.pwd = "Incorrect Password. Please check again.";
                }
                checkForPwd();
            }
            catch(err1) {
                console.log(err1);
            }
        }
        
        
        return errors;
    }

    return(
        <div>
            <div className="flex justify-center mb-10">
                <img className="w-[60%] h-40" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlnlOAdD8RdlFFY08Lbxe7a0khhgR93lOWg&usqp=CAU"></img>
            </div>

            {
                serverErrorMesg!='' ? <div className="flex justify-center text-center"><div></div><div className=" w-[500px] p-2 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">                    
                    <div className="font-medium">{serverErrorMesg}</div>                    
                </div><div></div></div> : ''
            }

            <div className="w-[100%] mt-5 flex justify-center ">
                <div className="min-h-[220px] px-10 border border-red-400 bg-gray-50 shadow-2xl rounded-xl">
                    <div className="mt-5 mb-3 flex justify-center">
                        <div className="mr-10 w-72">
                            <label htmlFor="mobile_no" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Your registered mobile number</label>
                            <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleOnchange} maxLength="10" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                { formValidationErrors.mobile_no != '' ? formValidationErrors.mobile_no : ''}
                            </div>
                        </div>
                        <div className="w-72">
                            <label htmlFor="pwd" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="pwd" name="pwd" value={formData.pwd} onChange={handleOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                { formValidationErrors.pwd != '' ? formValidationErrors.pwd : ''}
                            </div>
                        </div>
                    </div>                    
                    <div className="flex justify-center mb-2">
                        <div>
                            <button onClick={handleTheLoginClick} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Login;