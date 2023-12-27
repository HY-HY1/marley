import React, { useEffect, useState } from 'react';
import Style from '../style/search.module.css';
import { MagnifyingGlass } from 'phosphor-react';
import axios from 'axios';

export const Search = ({ visible }) => {
    const [query, setQuery] = useState('');

    const handleClick = (e) => {
        try {
            e.preventDefault();
            window.location.href = `/search?query=${query}`;
            console.log('Clicked');
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    };



    return (
        <React.Fragment>
            {visible ? (
                <React.Fragment>
                    <div className={Style.container}>
                        <div className={Style.form}>
                            <form>
                                <div className={Style.formContainer}>
                                    <div className={Style.item}>
                                        <div className={Style.searchIcon} onClick={handleClick}>
                                            <MagnifyingGlass color='black' size={24} />
                                        </div>
                                    </div>
                                    <div className={Style.item}>
                                        <div className={Style.input}>
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                            />
                                        </div>
                                    </div>
                                    <div className={Style.item}></div>
                                </div>
                            </form>
                        </div>
                        <div className={Style.predictive}>
                            {/* Add any content for predictive search results */}
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment></React.Fragment>
            )}
        </React.Fragment>
    );
};

export const Predictive = ({ query }) => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.post(
                    'YOUR_API_ENDPOINT', // Replace with your actual API endpoint
                    { query },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                setResults(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSearchResults();
    }, [query]);

    return <React.Fragment>{/* Display results or handle as needed */}</React.Fragment>;
};
