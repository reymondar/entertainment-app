import React, { memo } from "react";
import * as styles from './Carousel.module.scss'
import { MoviesQuery } from "../../types";
import CarouselCard from "../Card/CarouselCard/Card";


const CarouselCatalog = memo(( { movies } : { movies: MoviesQuery[]} ) => {

    return(
        <>
        <h1 className={styles.title}>Trending</h1>
        <div className={styles.carousel}>
            <div className={styles.catalog_carousel}>
                {movies.map((allMovieProps,i) => {
                return(<CarouselCard key={i} type={'Movie'} {...allMovieProps} />)
                })}
            </div>
        </div>
        </>
    )
},)

export default CarouselCatalog