import './globals.css';
import { Asap_Condensed } from 'next/font/google';
import Head from 'next/head';

const asap = Asap_Condensed({
    weight: ['400', '600', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--asap-font',
});

export const metadata = {
    title: 'Reece Goddard | Software Developer & Product Designer',
    description: `Welcome to Reece Goddard's portfolio website. Reece is a user experience designer and software developer, passionate about creating exceptional user experiences. Explore his diverse portfolio showcasing innovative designs and well-crafted development projects. From intuitive user interfaces to seamless interactions, Reece combines creativity and technical expertise to deliver compelling digital experiences. Discover his work and get inspired by the intersection of design and development at reecegoddard.com.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b71356" />
                <meta name="msapplication-TileColor" content="#b91d47" />
                <meta name="theme-color" content="#b71356"></meta>
            </Head>
            <body className={asap.className}>{children}</body>
        </html>
    );
}
