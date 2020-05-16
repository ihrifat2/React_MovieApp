import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { Grid } from '@material-ui/core';

const API_KEY = 'eb7f19c3'

function Movies(props) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [q, setQuery] = useState('batman');
    const [activateModal, setActivateModal] = useState(false);
    const [detail, setShowDetail] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);

    useEffect(() => {

        setLoading(true);
        setError(null);
        setData(null);

        fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            if (response.Response === 'False') {
                setError(response.Error);
            }
            else {
                setData(response.Search);
            }

            setLoading(false);
        })
        .catch(({message}) => {
            setError(message);
            setLoading(false);
        })

    }, [q]);
    console.log(data)
    return (
        <div>
            <Grid container spacing={3}>
                { data !== null && data.length > 0 && data.map((movie, index) => (
                    <Movie 
                        key={movie.imdbID}
                        title={movie.Title}
                        year={movie.Year}
                        image={movie.Poster}
                    />
                ))}
            </Grid>
        </div>
    );
}

export default Movies;