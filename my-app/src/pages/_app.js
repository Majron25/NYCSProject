// pages/_app.js
import Layout from '../components/MainMenu';
import '../styles/globals.css';  // Możesz dodać globalne style

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
