require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})


const PATH  = process.env.PATH
const TOKEN = process.env.BEARER_TOKEN
const fetch = require('node-fetch')

//Creamos el nodo para el Graphql

exports.sourceNodes = async ({
    actions: { createNode },
    createContentDigest
}) => {

    const fetchMovies = async (endpoint, type,format) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/${format}/${endpoint}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            }
        )
        
        if (format === 'movie') {
            const data = await response.json()
            .then(res => {
                res.results.forEach(movie => {
                    createNode({
                        ...movie,
                        id: String(movie.id),
                        parent: null,
                        children: [],
                        internal: {
                            type:`${type}`,
                            contentDigest: createContentDigest(movie)
                        },
                    })
                })
            })
        }
        else {
            const data = await response.json()
            .then(res => {
                res.results.forEach(serie => {
                    createNode({
                        ...serie,
                        id: String(serie.id),
                        parent: null,
                        children: [],
                        internal: {
                            type:`${type}`,
                            contentDigest: createContentDigest(serie)
                        },
                    })
                })
            })
        }
    }
    
    await Promise.all([
        fetchMovies('upcoming','UpcomingMovieCatalog','movie'),
        fetchMovies('popular', 'MovieCatalog','movie'),
        fetchMovies('popular','SeriesCatalog','tv')
    ])
}

