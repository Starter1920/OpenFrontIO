import { ClientEnv } from "./ClientEnv";

// The account/shop API origin (api.<audience>). Lives apart from Api.ts so
// modules that Api.ts itself depends on (ServerList) can reach it without an
// import cycle; Api.ts re-exports both for its existing importers.

export function getApiBase() {
  const domainname = getAudience();

  if (domainname === "localhost") {
    const apiDomain = process.env.API_DOMAIN;
    if (apiDomain) {
      return `https://${apiDomain}`;
    }
    const override = localStorage.getItem("apiHost");
    if (override) return override;
    // No hardcoded loopback: a friend on LAN/VPN opens this page from their
    // own machine, where "localhost" would point at them instead of the host.
    return `http://${window.location.hostname}:8787`;
  }

  return `https://api.${domainname}`;
}

export function getAudience() {
  // Sourced from BOOTSTRAP_CONFIG (server/desktop-injected) rather than
  // window.location, so the desktop app (app://openfront) targets real infra.
  return ClientEnv.jwtAudience();
}
