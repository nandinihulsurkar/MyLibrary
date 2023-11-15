
const BookCard = ({BookData}) => {
    return(
        <div className="m-5 p-2 border border-red-200 rounded-lg  hover:bg-red-50">
            <div className="w-52 h-60 flex items-center justify-center shadow-md cursor-pointer">
                <img className="w-48 h-60 rounded-lg" src={BookData.image}></img>
            </div>
            <div className="mt-2 h-auto text-center w-52 ">
                {BookData.name}
            </div>
            <div className="p-1 text-center bg-red-50">
                By: {BookData.author}
            </div>
            
        </div>
    )
}

export default BookCard;