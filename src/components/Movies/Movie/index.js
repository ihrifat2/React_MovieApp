import React from 'react';

const Movie = props => (
    <div className="movie">
        <h2>{props.title}</h2>
        <img src={props.image === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : props.image} alt={props.title}/>
        <h3>{props.year}</h3>
    </div>
);

export default Movie;