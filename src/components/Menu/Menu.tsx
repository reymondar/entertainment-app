import { StaticImage } from 'gatsby-plugin-image'
import React, { memo } from 'react'
import * as styles from './Menu.module.scss'
import Logo from '../../../static/svg/logo.inline.svg'
import movies from '../../../static/svg/icon-nav-movies.svg'
import series from '../../../static/svg/icon-nav-tv-series.svg'
import bookmark from '../../../static/svg/icon-nav-bookmark.svg'
import home from '../../../static/svg/icon-nav-home.svg'
import { Link } from 'gatsby'   

const Menu = () => {
    return(
        <div className={styles.container}>
            <div className={styles.menu}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <nav className={styles.navigation}> 
                    <Link to="/"><img src={home} /></Link>
                    <Link to="/movies"><img src={movies} /></Link> 
                    <Link to="/series"><img src={series} /></Link>
                    <Link to="/bookmark"><img src={bookmark} /> </Link>
                </nav>
                <div className={styles.avatar}>
                <Link to="/login">    
                    <StaticImage src='../../images/image-avatar.png' alt="avatar" width={40} height={40} />
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Menu