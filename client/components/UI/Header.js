import Head from 'next/head'
import styled from 'styled-components'

const Logo = styled.h1`
  font-size: 50px;
`

const Header = () => {
  return (
      <div>
        <Head>
          <title>Next.js Login</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Logo>Robert's Login</Logo>
      </div>
    
  );
}

export default Header