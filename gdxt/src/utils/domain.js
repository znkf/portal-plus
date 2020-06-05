const protocol = window.location.protocol; // http https

const domain_test = process.env.VUE_APP_API_BASE_URL;
const isProd = process.env.NODE_ENV === "production";
export const domain = isProd
  ? protocol + domain_test
  : process.env.VUE_APP_API_BASE_URL;

export const domain_ywtb = isProd
  ? protocol + process.env.VUE_APP_API_BASE_URL_GETEVT
  : "";

export const domian_cardPreview = isProd
  ? protocol + process.env.VUE_APP_API_BASE_URL_CARDREVIEW
  : "";
