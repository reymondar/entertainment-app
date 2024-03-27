import React from 'react'
import Menu from '../Menu/Menu'
import * as styles from './Layout.module.scss'

const Layout = ({children}: any) => {
    return(
        <>
        <Menu />
        <main className={styles.main}>
            <div className={styles.container}>
                {children}
            </div>
        </main>
        </>
    )
}

export default Layout