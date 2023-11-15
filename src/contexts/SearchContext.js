import { createContext } from "react";

const SearchContext = createContext({
    searchedTextIs: "",
});

export default SearchContext;