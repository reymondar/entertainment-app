import React, { memo } from "react";
import * as styles from './Catalog.module.scss'
import Card from "../Card/MainCard/Card";
import { MoviesQuery } from "../../types";

type CatalogProps = {
    title: string,
    catalog: MoviesQuery[]
}

const Catalog = memo(( { title,  catalog } : CatalogProps ) => {

    return(
        <>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.catalog}>
                {catalog.map((allMovieProps: MoviesQuery,i) => {
                return(<Card key={i} {...allMovieProps} />)
                })}
            </div>
        </>
    )
})

export default Catalog