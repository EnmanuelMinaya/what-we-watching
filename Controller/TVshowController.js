import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

//POST api/TVshow/search
//public access
const addToList = asyncHandler(async (req, res) => {


    const url = 'https://api.themoviedb.org/3/search/tv?query=succ';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.TMDB_API_KEY
        }
    };

    fetch(url, options)
        .then(res => res.json())//al parecer aqui se esta agregando el json en la respuesta pero no se ve en postman, cuando se a la URL postman no termina de cargar
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));

    return res.status(200)
});

export {
    addToList,
};