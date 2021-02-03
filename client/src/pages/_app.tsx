import { AppProps } from "next/app";
import axios from "axios";
import "../styles/globals.css";

axios.defaults.baseURL = "http://localhost:5000/api";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
