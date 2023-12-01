import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AddEditBook = () => {
    const { bookId } = useParams();
    
    const [pageTitle, setPageTitle] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [formData, setFormData] = useState({});
    const [formValidationErrors, setFormValidationErrors] = useState({});
    const [aeBtnClicked, setAEBtnClicked] = useState(false);
    const [serverErrorMesg, setServerErrorMesg] = useState('');
    const [serverSuccessMesg, setServerSuccessMesg] = useState('');

    const [file, setFile] = useState();    

    useEffect(() => {
        bookId > 0 ? setPageTitle('Edit Book') : setPageTitle('Add New Book');

        if(bookId > 0)
        {
            const getBookDataHere = async () => {
                const bookData = await axios.get('http://localhost:8800/books/fetchBookDetails/'+bookId);                
                setFormData(bookData.data[0]);
                setBookTitle(' : '+bookData.data[0]['title']);
            }
            getBookDataHere();
        }

    }, [])    

    const handleInputOnchange = (e) => { 
        e.persist();
        setFormData({...formData, [e.target.name]: e.target.value});

        //console.log(e.target.files);
        //setFile(URL.createObjectURL(e.target.files[0]));
    }    

    const handleTheAESubmitClick = () => {
        setAEBtnClicked(true);
        setFormValidationErrors( validateTheFormHere(formData) );
    }

    useEffect(() => {
        
        //console.log(formData);
        setServerSuccessMesg(''); setServerErrorMesg('');
        if(aeBtnClicked && Object.keys(formValidationErrors).length == 0)
        {
            const addEditBookHere = async () => {
                const addEditBook = await axios.post('http://localhost:8800/books/addOrEditBook', formData);
                console.log('The return val == '+addEditBook.data);
                if(addEditBook.data == 'Add Book Success'){
                    setServerSuccessMesg('The book is added successfully.');
                    setFormData({});
                }
                else if(addEditBook.data == 'Edit Book Success')
                    setServerSuccessMesg('The book is updated successfully.');
                else
                    setServerErrorMesg(addEditBook.data);
            }
            addEditBookHere();
        }

    }, [formValidationErrors])

    const validateTheFormHere = (values) => {
        const errors = {};

        if(!values.isbn)
            errors.isbn = 'Please enter the isbn.';
        if(!values.title)
            errors.title = 'Please enter the title.';
        if(!values.author)
            errors.author = 'Please enter the author name.';
        if(!values.publisher)
            errors.publisher = 'Please enter the publisher name.';
        if(!values.language)
            errors.language = 'Please enter the language.';

        return errors;
    }

    return(
        <div className="m-10">
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

            <div className="flex justify-center">  
                <div className="w-[10%]"></div>
                <div className="w-[70%] p-2 font-semibold text-lg text-green-500 mb-3 border border-gray-200 rounded-lg shadow-sm">{pageTitle} {bookTitle}</div>
                <div className="w-[10%]"></div>
            </div>

            <div className="flex justify-center">            
                <div className="w-[10%]"></div>
                <div className="w-[70%] px-2 flex justify-center border border-gray-200 rounded-lg shadow-sm ">
                    <div className="w-[50%] px-2">
                        <div className="mb-5 mt-2 w-[350px]">
                            <label htmlFor="isbn" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">ISBN</label>
                            <input type="text" id="isbn" name="isbn" value={formData.isbn} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.isbn != '' ? formValidationErrors.isbn : ''}
                            </div>                            
                        </div>
                        <div className="mb-5 w-[350px]">
                            <label htmlFor="title" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.title != '' ? formValidationErrors.title : ''}
                            </div>
                        </div>
                        <div className="mb-5 w-[350px]">
                            <label htmlFor="author" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                            <input type="text" id="author" name="author" value={formData.author} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.author != '' ? formValidationErrors.author : ''}
                            </div>
                        </div>
                        <div className="mb-5 w-[350px]">
                            <label htmlFor="publisher" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Publisher</label>
                            <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.publisher != '' ? formValidationErrors.publisher : ''}
                            </div>
                        </div>
                        <div className="mb-5 w-[350px]">
                            <label htmlFor="language" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Language</label>
                            <input type="text" id="language" name="language" value={formData.language} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.language != '' ? formValidationErrors.language : ''}
                            </div>
                        </div>
                    </div>
                    <div className="w-[50%] px-2  ">
                        <div className="mb-5 mt-2 w-[350px]">
                            <label htmlFor="total_count" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Total Books</label>
                            <input type="text" id="total_count" name="total_count" value={formData.total_count} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.total_count != '' ? formValidationErrors.total_count : ''}
                            </div>                            
                        </div>
                        <div className="mb-5 mt-2 w-[350px]">
                            <label htmlFor="available_count" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Available Books</label>
                            <input type="text" id="available_count" name="available_count" value={formData.available_count} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.available_count != '' ? formValidationErrors.available_count : ''}
                            </div>                            
                        </div>
                        <div className="mb-5 mt-2 w-[350px]">
                            <label htmlFor="no_of_borrow_days" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Can be borrowed for (in number of days)</label>
                            <input type="text" id="no_of_borrow_days" name="no_of_borrow_days" value={formData.no_of_borrow_days} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.no_of_borrow_days != '' ? formValidationErrors.no_of_borrow_days : ''}
                            </div>                            
                        </div>
                        <div className="mb-5 mt-2 w-[350px]">
                            <label htmlFor="fine_per_day" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Fine Per Day</label>
                            <input type="text" id="fine_per_day" name="fine_per_day" value={formData.fine_per_day} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.fine_per_day != '' ? formValidationErrors.fine_per_day : ''}
                            </div>                            
                        </div>
                        {/**
                        <div className="mb-5 mt-2 w-[350px]">
                            <label htmlFor="cover_pic" className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                            <input type="file" id="cover_pic" name="cover_pic" value={formData.cover_pic} onChange={handleInputOnchange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="text-red-500 ml-1 text-sm" >
                                {formValidationErrors.cover_pic != '' ? formValidationErrors.cover_pic : ''}
                            </div>                            
                        </div>
                         */}
                    </div>
                </div>
                <div className="w-[10%]"></div>
            </div>

            <div className="flex justify-center my-2">
                <div>
                    <button onClick={handleTheAESubmitClick} className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full mr-7">
                        Submit
                    </button>

                    {/**
                    <Link to='admin/manage-books'>
                        <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full">
                            Cancel
                        </button>
                    </Link>
                    */}

                </div>
            </div>
        </div>
    )
};

export default AddEditBook;