import React, { ChangeEvent, SetStateAction } from "react";
import * as styles from './SearchBar.module.scss'
import { StaticImage } from "gatsby-plugin-image";
import search from '../../../static/svg/icon-search.svg'



const SearchBar = ( {placeholder, setSearch } : {placeholder: string, setSearch: React.Dispatch<SetStateAction<string | null>> } ) => {
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

    return(
        <div className={styles.container}>
            <img src={search} alt='searchbar'className={styles.icon} />
            <input type="text" placeholder={placeholder} className={styles.search} onChange={handleChange} />
        </div>
    )
}

export default SearchBar 