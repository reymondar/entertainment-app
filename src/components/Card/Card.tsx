import React from 'react'
import * as styles from './Card.module.scss'
import { StaticImage } from 'gatsby-plugin-image'

export default function Card() {
  return (
    <div className={styles.container}>
        <div className={styles.banner} style={{backgroundColor: `lightblue`}}>
            <div className={styles.circle}>
              <StaticImage src="../../../public/static/svg/icon-bookmark-empty.svg" alt="bookmark" style={{alignSelf:'center'}} />
            </div>
        </div>
        <ul className={styles.details}>
            <li>2019</li>
            <li className={styles.category}><div className={styles.iconContainer}><StaticImage src="../../../public/static/svg/icon-category-movie.svg" alt="icon" className={styles.icon} /></div>Movies</li>
            <li className={styles.audience}>PG</li>
        </ul>
        <h1>The Great Lands</h1>
    </div>
  )
}
  