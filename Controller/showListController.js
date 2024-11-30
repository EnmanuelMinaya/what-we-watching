import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';


dotenv.config();

const prisma = new PrismaClient();

//POST api/showLists/create 
//createShowList
//public access
const createShowList = asyncHandler(async (req, res) => {
    const { name: showListName } = req.body;
    const { id: authorId } = req.user;

    const showList = await prisma.showList.create({
        data: {
            name: showListName,
            visibility: 'private',
            authorId: authorId
        },
    });
    if (showList) {
        res.status(200).json({
            id: showList.id,
            name: showList.name
        });
    } else {
        throw new Error('Error saving new showList to database');
    }
});


//PATCH api/showLists/add 
//addToList
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
    createShowList, addToList
};