
const AuthorCard = ({authorData}) => {
    console.log(authorData);
    return(
        <div className="m-4 p-2 w-52 h-15 border border-red-500 rounded-lg shadow-md hover:bg-red-100">
            {/**
            <div className="w-48 h-60">
                <img className="w-48 h-60 rounded-xl cursor-pointer" src={authorData.image}></img>
            </div>
            */}
            <div className="mt-1 text-center font-serif ">
                {authorData.author}
            </div>
            {/**
            <div className="mt-1 text-center font-serif">
                {authorData.duration}
            </div>
             */}
        </div>
    )
}

export default AuthorCard;