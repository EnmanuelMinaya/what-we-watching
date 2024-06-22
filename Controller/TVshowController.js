import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

//POST api/TVshow/search
//public access
const addToList = asyncHandler(async (req, res) => {
    const { query } = req.query;
    if (!query) {
        res.status(400);
        throw Error('Query parameter required');
    }
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.TMDB_API_KEY
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => res.send(json))
        .catch(err => console.error('error:' + err));

});

export {
    addToList,
};