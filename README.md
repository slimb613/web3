# Assignment 1: Art Database-Driven API

## Overview

This project is a database-driven API for querying art data, including paintings, artists, genres, galleries and eras. The API make uses of Node, JS, Express and Supabase to connect several csv files and return data that are related in JSON format. Database is built on and connected through Supabase. Handling of various routes is done via Express and Node. 

For deployment, using Render: [link]

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
- heth
