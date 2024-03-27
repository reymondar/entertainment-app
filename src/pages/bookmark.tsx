import React, { useEffect, useState } from "react";
import * as api from '../api/api'
import Layout from "../components/Layout/Layout";
import SearchBar from "../components/SearchBar/SearchBar";
import useSearch from "../hooks/useSearch";
import { MoviesQuery, SeriesQuery } from "../types";
import Catalog from "../components/Catalog/Catalog";

const Bookmark = () => {

   const [ bookmarks, setBookmarks ] = useState<null| MoviesQuery[] >(null)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(()=>{
      const getWatchlist = async () => {
         try {
            Promise
            const movieList = await api.default.getWatchList('movies')
            const tvList = await api.default.getWatchList('tv')

            const bookmarkedShows = movieList.map((item: MoviesQuery) => ({...item, internal: { type: 'MovieCatalog'}, title: item.original_title, release_date: item.release_date.substring(0,4)}))
                                    .concat(tvList.map((item: SeriesQuery) => ({...item, internal: { type: 'SeriesCatalog'}, title: item.original_name, release_date: item.first_air_date.substring(0,4)})))
            
            setBookmarks(bookmarkedShows)

            setIsLoading(false)
         }
         catch (error) {
            console.log(error)
            setIsLoading(false)
         }

      } 
      getWatchlist()
   },[])

   const { catalog , search, setSearch } = useSearch(bookmarks)
   
   //Cambiar despues esta logica con la pantalla de carga
   if(bookmarks) {
 
   return(
      <Layout>
         <SearchBar placeholder="Search for bookmarked shows" setSearch={setSearch} />
         {!isLoading && !search ?
         <div> 
         <Catalog title="Bookmarked Movies" catalog={bookmarks?.filter(a => a.internal.type === 'MovieCatalog')} />
         <Catalog title="Bookmarked TV Series" catalog={bookmarks?.filter(a => a.internal.type === 'SeriesCatalog')} />
         </div>
         :
         catalog ? 
         <Catalog title="Results" catalog={catalog} />
         :
         <div>Looks like you haven't bookmarked any show yet</div>
         }
      </Layout>
   )
}
} 

export default Bookmark