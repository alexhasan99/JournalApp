import Keycloak from "keycloak-js";

const config = {
  url: "http://localhost:8090/",
  realm: "Journal",
  clientId: "frontend",
};

const keycloak = new Keycloak(config);

export { keycloak };