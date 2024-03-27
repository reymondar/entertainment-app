import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import Layout from '../components/Layout/Layout'
import Catalog from '../components/Catalog/Catalog'
import { useStaticQuery , graphql } from 'gatsby'
import useSearch from '../hooks/useSearch'
export default function Movies() {
    
  const { allMovieCatalog }  = useStaticQuery(graphql`{
    allMovieCatalog {
      nodes {
        title
        release_date(formatString: "YYYY")
        popularity
        poster_path
        vote_average
        id
        internal {
          type
        }
      }
    }
  }
  `)
  
  const { catalog, setSearch } = useSearch(allMovieCatalog.nodes)

  return (
    <Layout>        
        <SearchBar placeholder='Search for movies' setSearch={setSearch} />
        {catalog && <Catalog title="Movies" catalog={catalog} />}
    </Layout>
  )
}
