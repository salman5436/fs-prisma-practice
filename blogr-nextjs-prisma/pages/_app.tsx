import { SessionProvider } from 'next-auth/react'
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    //SessionProvider allows us to persist a user's authentication state across the entire application
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
