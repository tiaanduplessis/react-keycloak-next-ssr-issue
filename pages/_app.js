import cookie from 'cookie'
import React from 'react'

import { SSRKeycloakProvider, Persistors } from '@react-keycloak/nextjs'

const keycloakCfg = {
    realm: "ifings",
    clientId: "app-management",
    url: `https://id.fullfacing.io:443/auth`,
    'ssl-required': 'external',
    'public-client': true,
    'confidential-port': 0
}

const initConfig = {
    onLoad: 'login-required'
}

function MyApp({ Component, pageProps, cookies }) {
  return (
    <SSRKeycloakProvider
      initConfig={initConfig}
      keycloakConfig={keycloakCfg}
      persistor={Persistors.Cookies(cookies)}
    >
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  )
}

function parseCookies(req) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req)
  }
}

export default MyApp