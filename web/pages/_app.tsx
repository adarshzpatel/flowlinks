import { Toaster } from "react-hot-toast";
import AuthProvider from "../context/AuthContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../flow/config"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Toaster position="bottom-left"/>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
