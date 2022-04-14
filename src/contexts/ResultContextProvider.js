import React from "react";
import { useState, useContext, createContext } from "react";

const StateContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

// Type of the data: images, videos, or news
export const StateContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('lionel messi');

    const getResults = async (req) => {
        setIsLoading(true)
        const res = await fetch(`${baseUrl}${req}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            },
        });
        const data = await res.json()

        if (req.includes('/news')) {
            setResults(data.entries)
        } else if (req.includes('/image')) {
            setResults(data.image_results)
        }
        else {
            setResults(data)
        }

        setIsLoading(false);
    }

    return (
        <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);