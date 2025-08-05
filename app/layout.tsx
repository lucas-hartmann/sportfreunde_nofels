import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" className="bg-primary">
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="font-sans bg-white text-black flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
