import React from "react";
import * as styles from "./Details.module.scss"
import movie from '../../../../static/svg/icon-category-movie.svg'
import tv from '../../../../static/svg/icon-category-tv.svg'

type DetailsProps = {
    title: string,
    popularity: number,
    release_date: string,
    first_air_date: string,
    internal: {
        type: 'MovieCatalog' | 'SeriesCatalog'
    }
}


const Details = ({ title, popularity, release_date,first_air_date, internal}: DetailsProps) => {
    
    return(
        <>
            <ul className={styles.details}>
                <li>{release_date || first_air_date}</li>
                <li>
                    {internal.type === 'SeriesCatalog' 
                    ?
                    <>
                        <div className={styles.iconContainer}>
                            <img src={tv} alt="icon" />
                        </div>
                        {'TV'}
                    </> 
                    :
                    <>
                        <div className={styles.iconContainer}>
                            <img src={movie} alt="icon" />
                        </div>
                        {'Movie'}
                    </> 
                    }
                </li>
                <li>{popularity}</li>
            </ul>
            <h1>{title}</h1>
        </>
    )
}

export default Details