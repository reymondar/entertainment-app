import React , { useState, useEffect, Suspense } from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout/Layout"
import SearchBar from "../components/SearchBar/SearchBar"
import Catalog from "../components/Catalog/Catalog"
import { graphql, useStaticQuery } from 'gatsby'
import CarouselCatalog from "../components/Carousel/Catalog"
import { MoviesQuery, SeriesQuery } from "../types"
import Modal from "../components/modal/Modal"

const IndexPage: React.FC<PageProps> = () => {

  const [catalog, setCatalog] = useState(null)
  const [ search, setSearch ] = useState<null|string>(null)

  const { allUpcomingMovieCatalog , allMovieCatalog , allSeriesCatalog}  = useStaticQuery(graphql`{
    allUpcomingMovieCatalog {
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
  
  
  useEffect(()=> {
    //Juntamos series y peliculas para el display, y lo filtramos si alguien realiza una busqueda
    setCatalog(allMovieCatalog.nodes
              .concat(allSeriesCatalog.nodes
                      .map((serie: SeriesQuery) => ({...serie, title: serie.name}) ))
              .sort((a: MoviesQuery, b: SeriesQuery) => Number(a.vote_average) - Number(b.vote_average))
              .filter((a: MoviesQuery) => search && search?.length > 0 ? a.title?.toLowerCase().includes(search?.trim()) : true))
    
  }, [search])

  return(
      <Layout>   
             <Modal />
        <SearchBar placeholder='Search for movies or TV Series' setSearch={setSearch} />
        <CarouselCatalog movies={allUpcomingMovieCatalog.nodes} />
        <Suspense fallback={<div>Loading..</div>}>
          {catalog && <Catalog title="Recommended for you" catalog={catalog} /> }     
        </Suspense>  
      </Layout>
  )
}

export const Head: HeadFC = () => <title>Entretainment Web App</title>




export default IndexPage
