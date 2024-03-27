import React, { useState } from 'react'
import * as styles from './Card.module.scss'
import bookmarkEmpty from '../../../../static/svg/icon-bookmark-empty.svg'
import bookmarkFull from '../../../../static/svg/icon-bookmark-full.svg'
import Details from '../Details/Details'
import * as api from '../../../api/api'
import { MoviesQuery, SeriesQuery } from '../../../types'

export default function CarouselCard(props: MoviesQuery | SeriesQuery) {
  
  const [isSaved, setIsSaved] = useState(false)
  
  const handleWatchlist = () => {
    
    const type = props.internal.type === 'MovieCatalog' ? 'movie' : 'tv'

    try {
      const success = api.default.modifyWatchList(type,props.id, !isSaved)
      
      setIsSaved(prev => !prev)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.banner_one} style={{background: `center / cover no-repeat url("https://image.tmdb.org/t/p/original/${props.poster_path}")`}}>
      <div className={styles.circle}>
        <img src={!isSaved ? bookmarkEmpty : bookmarkFull} alt="bookmark" style={{alignSelf:'center'}} onClick={handleWatchlist} />
      </div>
      <div className={styles.details}>
        <Details {...props} />
      </div>
    </div>
  )
}

  