# Assignment 1: Art Database-Driven API

## Overview

This project is a database-driven API designed to retrieve and query art-related data, including paintings, artists, genres, galleries, and eras. It uses Node.js, JavaScript, Express.js, and Supabase to retrieve related records from a relational database and return the results in JSON format.

The database is hosted and managed through Supabase, which stores the art data imported from CSV files. Node.js and Express.js handle API routing and requests, while Supabase is used to query the database and retrieve the relevant information.

## Deployment

The API is deployed using Render.

## API Endpoints

| API Routes | Functionality|
| -------- | -------- |
| /api/eras  | Gets all eras  |
| /api/galleries  | Gets all galleries  |
| /api/galleries/:ref  |  Gets gallery by galleryId  |
| /api/galleries/:ref  | Gets galleries whose galleryCountry begins with the provided substring  |
| /api/artists  | Gets all artists  |
| /api/artists/:ref  | Gets artist by artistId  |
| /api/artists/search/:substring  | Gets artists whose lastName begins with the provided substring  |
| /api/artists/country/:substring  | Gets artists whose nationality begins with the provided substring  |
| /api/genres  | Gets all genres and their eras  |
| /api/genres/:ref  | Gets genre by genreID  |
| /api/genres/painting/:ref  | Gets genres used in a given painting  |
| /api/paintings/single/:ref  | Gets painting by paintingID  |
| /api/paintings/sort/:value/limit/:ref  | Gets limited or all paintings, their artist and gallery  |
| /api/paintings/sort/:value/limit/:ref/skip/:ref2  | Gets limited paintings, skipped from the first by the provided number  |
| /api/paintings/search/:substring  | Gets paintings whose title contains the provided substring  |
| /api/paintings/years/:start/:end  | Gets paintings between and inclusive of two provided years  |
| /api/paintings/galleries/:ref  | Gets all paintings in a given gallery by galleryID  |
| /api/paintings/artist/:ref  | Gets all paintings by a given artist by artistID  |
| /api/paintings/genre/:ref  | Gets all  paintings for a given genre by genreId field   |
| /api/paintings/era/:ref  | Gets all paintings for a given era by eraId   |
| /api/counts/genres  | Gets genre name and number of paintings for each  |
| /api/counts/artists  | Gets artist name and number of paintings for each  |
| /api/counts/topgenres/:ref  | Gets genre name and number of paintings for genres having over a set number  |

## API Requests For Testing
- [/api/eras](https://web3-fhqm.onrender.com/api/eras)
- [/api/galleries](https://web3-fhqm.onrender.com/api/galleries)
- [/api/galleries/30](https://web3-fhqm.onrender.com/api/galleries/30)
- [/api/galleries/calgary](https://web3-fhqm.onrender.com/api/galleries/calgary)
- [/api/galleries/country/fra](https://web3-fhqm.onrender.com/api/galleries/country/fra)
- [/api/artists](https://web3-fhqm.onrender.com/api/artists)
- [/api/artists/12](https://web3-fhqm.onrender.com/api/artists/12)
- [/api/artists/1223423](https://web3-fhqm.onrender.com/api/artists/1223423)
- [/api/artists/search/ma](https://web3-fhqm.onrender.com/api/artists/search/ma)
- [/api/artists/search/mA](https://web3-fhqm.onrender.com/api/artists/search/mA)
- [/api/artists/country/fra](https://web3-fhqm.onrender.com/api/artists/country/fra) 
- [/api/genres](https://web3-fhqm.onrender.com/api/genres)
- [/api/genres/76](https://web3-fhqm.onrender.com/api/genres/76)
- [/api/genres/painting/408](https://web3-fhqm.onrender.com/api/genres/painting/408)
- [/api/genres/painting/jsdfhg](https://web3-fhqm.onrender.com/api/genres/painting/jsdfhg) 
- [/api/paintings/single/63](https://web3-fhqm.onrender.com/api/paintings/single/63)
- [/api/paintings/sort/title/limit/10](https://web3-fhqm.onrender.com/api/paintings/sort/title/limit/10) 
- [/api/paintings/sort/year/limit/10](https://web3-fhqm.onrender.com/api/paintings/sort/year/limit/10)
- [/api/paintings/sort/absd/limit/10](https://web3-fhqm.onrender.com/api/paintings/sort/absd/limit/10)
- [/api/paintings/sort/year/limit/asd](https://web3-fhqm.onrender.com/api/paintings/sort/year/limit/asd) 
- [/api/paintings/sort/year/limit](https://web3-fhqm.onrender.com/api/paintings/sort/year/limit)
- [/api/paintings/sort/year/limit/10/skip/30](https://web3-fhqm.onrender.com/api/paintings/sort/year/limit/10/skip/30)
- [/api/paintings/sort/year/limit/10/skip/30000](https://web3-fhqm.onrender.com/api/paintings/sort/year/limit/10/skip/30000) 
- [/api/paintings/sort/year/limit/10/skip](https://web3-fhqm.onrender.com/api/paintings/sort/year/limit/10/skip)
- [/api/paintings/search/port](https://web3-fhqm.onrender.com/api/paintings/search/port)
- [/api/paintings/search/pORt](https://web3-fhqm.onrender.com/api/paintings/search/pOR)
- [/api/paintings/search/connolly](https://web3-fhqm.onrender.com/api/paintings/search/connolly)
- [/api/paintings/years/1800/1850](https://web3-fhqm.onrender.com/api/paintings/years/1800/1850)
- [/api/paintings/years/1850/1800](https://web3-fhqm.onrender.com/api/paintings/years/1850/1800)
- [/api/paintings/galleries/5](https://web3-fhqm.onrender.com/api/paintings/galleries/5) 
- [/api/paintings/artist/16](https://web3-fhqm.onrender.com/api/paintings/artist/16)
- [/api/paintings/artist/666](https://web3-fhqm.onrender.com/api/paintings/artist/666) 
- [/api/paintings/genre/78](https://web3-fhqm.onrender.com/api/paintings/genre/78) 
- [/api/paintings/era/2](https://web3-fhqm.onrender.com/api/paintings/era/2) 
- [/api/counts/genres](https://web3-fhqm.onrender.com/api/counts/genres)
- [/api/counts/artists](https://web3-fhqm.onrender.com/api/counts/artists)
- [/api/counts/topgenres/20](https://web3-fhqm.onrender.com/api/counts/topgenres/20)
- [/api/counts/topgenres/2034958](https://web3-fhqm.onrender.com/api/counts/topgenres/2034958)
