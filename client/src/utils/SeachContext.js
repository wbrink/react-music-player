import React, {useContext, createContext, useState} from "react";

const SearchContext = createContext();


export const SearchProvider = ({children}) => {
  const [searchResult, setSearchResult] = useState({
    tracks: [],
    artists: [],
    albums: [] 
  })

  return (
    <SearchContext.Provider value={[searchResult, setSearchResult]}>
      {children}
    </SearchContext.Provider>
  )
}


export const useSearchResults = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearchResults must be used within SearchProvider");
  }

  return context;
}
