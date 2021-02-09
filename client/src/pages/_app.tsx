import { AppProps } from "next/app";
import { useRouter } from "next/router";
import axios from "axios";
import { SWRConfig } from "swr";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../Context/AuthContext";
import "../styles/tailwind.css";
import "../styles/icons.css";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <SWRConfig value={{ fetcher }}>
      <AuthProvider>
        {!authRoute && <Navbar />}
        <div className={authRoute ? "" : "pt-12"}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
