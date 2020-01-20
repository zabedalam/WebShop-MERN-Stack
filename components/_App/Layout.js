import Head from "next/head";
// import { Container } from "semantic-ui-react";

import Header from "./Header";
import HeadContent from "./HeadContent";
import FooterAndCart from "./FooterAndCart";

function Layout({ children, user }) {
  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/media_queries.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=Cairo|Caveat|Dosis&display=swap" rel="stylesheet"/>        
        <title>WebShop </title>
      </Head>
      <Header user={user}/>
      {/* <Container text style={{ paddingTop: "1em" }}> */}
        {children}
      {/* </Container> */}
      <FooterAndCart/>
    </>
  );
}

export default Layout;

