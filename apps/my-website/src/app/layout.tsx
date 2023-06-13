import './globals.css';
import { Asap_Condensed } from 'next/font/google';

const asap = Asap_Condensed({ weight: ['400', '600', '900'], style: ['normal', 'italic'], subsets: ['latin'] });

export const metadata = {
    title: 'ReeceGoddard.com',
    description: `Welcome to Reece Goddard's portfolio website. Reece is a user experience designer and software developer, passionate about creating exceptional user experiences. Explore his diverse portfolio showcasing innovative designs and well-crafted development projects. From intuitive user interfaces to seamless interactions, Reece combines creativity and technical expertise to deliver compelling digital experiences. Discover his work and get inspired by the intersection of design and development at reecegoddard.com.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={asap.className}>{children}</body>
        </html>
    );
}
