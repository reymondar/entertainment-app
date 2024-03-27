import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import Layout from '../components/Layout/Layout'
import Catalog from '../components/Catalog/Catalog'
import { useStaticQuery , graphql } from 'gatsby'
import useSearch from '../hooks/useSearch'
import { SeriesQuery } from '../types'
export default function Movies() {
    
  const { allSeriesCatalog }  = useStaticQuery(graphql`{
   allSeriesCatalog {
      nodes {
        name
        popularity
        poster_path
        vote_average
        first_air_date(formatString: "YYYY")
        id
        internal {
          type
        }
      }
    }
  }
  `)

  const { catalog , setSearch } = useSearch(allSeriesCatalog.nodes.map((serie: SeriesQuery) => ({...serie, title: serie.name})))
 
  return (
    <Layout>        
        <SearchBar placeholder='Search for TV Series' setSearch={setSearch} />
        {catalog && <Catalog title="TV Series" catalog={catalog} />}
    </Layout>
  )
}
