import { Toaster } from "react-hot-toast";
import AuthProvider from "../context/AuthContext";
import type { AppProps } from "next/app";
import "../flow/config"
import { MantineProvider } from '@mantine/core'
import "../styles/globals.css";

import {neutral as gray} from 'tailwindcss/colors'

function MyApp({ Component, pageProps }: AppProps) {

  
  return (
    <AuthProvider>
        <MantineProvider
        withGlobalStyles

        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          colors:{
            // dark:[gray[100],gray[200],gray[300],gray[400],gray[500],gray[600],gray[700],gray[800],gray[900]],
            flow:['#CBFED4','#98FDB4','#64FA9D','#3DF596','#00ef8b','#00CD8C','#00AC86','#008A7A','#007270']
          },
          primaryColor:'flow',
          primaryShade: 6
        }}
      >

      <Toaster position="bottom-left"/>
      <Component {...pageProps} />
      </MantineProvider>
    </AuthProvider>
  );
}

export default MyApp;
