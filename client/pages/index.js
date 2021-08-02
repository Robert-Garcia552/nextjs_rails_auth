import Layout from '../components/layout'
import Link from 'next/link'

function Home() {
  return (
    <Layout>
      <Link href="/login">
        <a>Please click here to Login</a>
      </Link>
    </Layout>
  )
}

export default Home