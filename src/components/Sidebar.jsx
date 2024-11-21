import React from 'react'
import styles from "./Sidebar.module.css"
import Logo from './Logo'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'

function Sidebar() {
  return (
   
       <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        <Outlet />
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; copyright {new Date().getFullYear()} By WorldWise App
            </p>
        </footer>
      
    </div>
    
  )
}

export default Sidebar