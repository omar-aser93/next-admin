import Navbar from "@/components/dashboard/navbar/navbar"
import Sidebar from "@/components/dashboard/sidebar/sidebar"
import Footer from "@/components/dashboard/footer/footer"
import styles from "./dashboard.module.css"

const Layout = ({children}) => {  
  return (
    <div className={styles.container}>
        <div className={styles.menu}><Sidebar /></div>
        <div className={styles.content}>
            <Navbar />
            {children}
            <Footer />
         </div>
    </div>
  )
}

export default Layout