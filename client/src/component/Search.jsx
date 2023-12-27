import React, { useEffect, useState } from 'react';
import Style from '../style/search.module.css';
import { MagnifyingGlass } from 'phosphor-react';
import axios from 'axios'

export const Search = () => {
    const [query, setQuery] = useState('');

    return (
        <React.Fragment>
            <div className={Style.container}>
                <div className={Style.form}>
                    <form onSubmit={handleSearch}>
                        <div className={Style.searchIcon}>
                            <MagnifyingGlass size={32} />
                        </div>
                        <div className={Style.input}>
                            <input
                                type="text"
                                placeholder="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className={Style.predictive}>
                    <Predictive query={query}/>
                </div>
            </div>
        </React.Fragment>
    );
};

export const Predictive = ({ query }) => {

    const [ results , setResults ] = useState(null)

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.post('',
                { query },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                )

                setResults(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchSearchResults()
    })

    return (
        <React.Fragment>
        </React.Fragment>
    )
}