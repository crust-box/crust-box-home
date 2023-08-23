// @ts-ignore
const isBeta = true;

const baseUrl = "https://api.crustbox.decoo.io";
// const baseUrl = "http://localhost:3000";

export type GatewayType = { up: string; down?: string | string[] };

const gateways: GatewayType[] = [
  {
    up: "https://gw.crustfiles.net",
    down: "https://crustipfs.tech",
  },
  {
    up: "https://gw.smallwolf.me",
  },
  {
    up: "https://crust.fans",
  },
  {
    up: "https://crustgateway.com",
  },
  {
    up: "https://crustgateway.online",
  },
];

export default {
  isBeta,
  baseUrl,
  gateways,
};
