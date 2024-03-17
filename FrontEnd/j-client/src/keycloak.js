// keycloak.js
import Keycloak from 'keycloak-js';


const initOptions = {
  url: 'http://localhost:8090/',
  realm: 'Journal',
  clientId: 'frontend',
};

const kc = new Keycloak(initOptions);
let isKeycloakInitialized = false;

export const initializeKeycloak = () => {
  if (isKeycloakInitialized) {
    console.log("Keycloak instance is already initialized.");
    // Kontrollera om användaren redan är autentiserad
    return Promise.resolve({ kc, authenticated: kc.authenticated });
  }
  
  return kc.init({
    onLoad: 'login-required',
    checkLoginIframe: true,
    pkceMethod: 'S256',
  }).then(authenticated => {
    if (!authenticated) {
      window.location.reload();
    }
    console.info("Authenticated");
    sessionStorage.setItem('token', kc.token);
    isKeycloakInitialized = true;
    return { kc, authenticated };
  }).catch(error => {
    console.error("Authentication Failed", error);
    throw error;
  });
};

export default kc;
