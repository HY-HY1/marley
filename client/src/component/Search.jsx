import React, { useEffect, useState } from 'react';
import Style from '../style/search.module.css';
import { MagnifyingGlass } from 'phosphor-react';
import axios from 'axios';

export const Search = ({ visible }) => {
  const [query, setQuery] = useState('');
  console.log(`Query: ${query}`);

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
              <Predictive query={query} />
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
    const [results, setResults] = useState([]);
  
    useEffect(() => {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3001/product/search',
            { name: query },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          setResults(response.data.products); // Assuming the response is an array, adjust as needed
          console.log(results)
          return
        } catch (error) {
          console.error(error);
          setResults([]); // Handle error by setting results to an empty array
        }
      };
  
      fetchSearchResults();
    }, [query]);
  
    return (
        <React.Fragment>
          {/* Display results or handle as needed */}
          <div className={Style.resultsContainer}>
            {results && results.length > 0 ? (
              <div className={Style.resultsGrid}>
                {results.map((result) => (
                  <div className={Style.item} key={result._id}>
                    <div className={Style.image}>
                      <img src={result.description.type.images[0]} alt="" />
                    </div>
                    <div className={Style.product}>
                      <ul>
                        <li>{result.name}</li>
                        <li>{result.price}</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No results found</div>
            )}
          </div>
        </React.Fragment>
      );
}      