import styles from '../styles/Home.module.css'
import Header from './UI/Header.js'
import Footer from './UI/Footer.js'

function Layout({children}) {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout