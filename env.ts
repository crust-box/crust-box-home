// @ts-ignore
const isBeta = true;

const baseUrl = isBeta ? "https://beta-api.baitech-ipfs.net" : "https://api.baitech-ipfs.net";

const auth = isBeta
  ? "Bearer c3Vic3RyYXRlLWNUTEJlSGlvd2JDZE1rdjNLaENSQkxzbXNmRDNicVlnVlZURU5DQlp1ZjIxRW5OOEc6MHgwMjFiNTU1OTg3ZGU4OTJlY2JlMmE5MWIzMTI3Mzg4OGIwYTUwYzZmN2ExNzAwNTFhNzVkNjAwMDc2NzhiYjA1YTU0NWIwYjJkNjVkYmRlNTJmNWQyNDU0NzljODRiMzExZDQxMjM5MjU3MzM5MTlhMGFkMzhiZWE0YjRlZGM4OQ"
  : "Bearer c3Vic3RyYXRlLWNUSjJ3bUg5WmZuOHpLd0M2NnFQanZpRHU4M05yVmdjM0JHTG56emJNOFRSWkxhWmk6MHhiYWNlNzRhMDAwMjc5MDY3MzBlMTc5NmEyNWU2OWU2ZWRjYmIyNzg1MDEwZjVjYzYxOTg0YmQwM2I2NDk5YTE5MTY5MTEyMDdhNDNkNGFmM2MwMWEyNjRhMTRiN2UyOGQ2ZmRhYzExOTJhMmU5YmZiMTc5NjMzNGYxZTE5MGU4Mg==";

export default {
  isBeta,
  baseUrl,
  auth,
};
