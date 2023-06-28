import React from 'react'
import Card from './Card/Card'
import Menu from './Menu/Menu'
import * as styles from './App.module.scss'
const App = () => {
  return (
    <main className={styles.main}>
        <Card />  
        <Menu />
    </main>
  )
}


export default App