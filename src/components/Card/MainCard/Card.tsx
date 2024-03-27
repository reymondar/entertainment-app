import React, { useState } from 'react'
import * as styles from './Card.module.scss'
import bookmarkEmpty from '../../../../static/svg/icon-bookmark-empty.svg'
import bookmarkFull from '../../../../static/svg/icon-bookmark-full.svg'
import Details from '../Details/Details'
import * as api from '../../../api/api'
import { MoviesQuery, SeriesQuery } from '../../../types'

const Card = (props: MoviesQuery | SeriesQuery) => {
  
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
    <div className={styles.container}>
        <div className={styles.banner} style={{background: `center / cover no-repeat url("https://image.tmdb.org/t/p/original/${props.poster_path}")`}}>
            <div className={styles.circle} onClick={handleWatchlist}>
              <img src={!isSaved ? bookmarkEmpty : bookmarkFull} alt="bookmark" style={{alignSelf:'center'}} />
            </div>
        </div>
        <Details {...props}  />
    </div>
  )
}
  
export default Card