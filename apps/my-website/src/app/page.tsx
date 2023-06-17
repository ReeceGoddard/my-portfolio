import Image from 'next/image';
import { Project } from './project';
import styles from './page.module.css';
import { ContactForm } from './contactForm';

export default function Home() {
    return (
        <main className={styles.main}>
            <section className={styles.logoSection}>
                <div className={styles.logo}>
                    <Image
                        className={styles.logoBackground}
                        src="/images/logo-background.webp"
                        alt="Animated logo background"
                        fill
                    />
                    <svg
                        className={styles.logoSVG}
                        width="28"
                        height="31"
                        viewBox="0 0 28 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className={styles.logoSVGPath}
                            d="M11.703 5.528C11.1057 4.93067 10.3803 4.44 9.527 4.056C8.67367 3.672 7.75633 3.48 6.775 3.48C5.495 3.48 4.25767 3.33067 3.063 3.032C1.911 2.73333 1.015 2.02933 0.375 0.920001V16.28L5.495 15V9.24C5.495 8.89867 5.623 8.6 5.879 8.344C6.135 8.088 6.43367 7.96 6.775 7.96C7.287 7.96 7.64967 8.17333 7.863 8.6L11.703 5.528ZM11.05 31H24.618C25.3433 31 25.9193 30.7653 26.346 30.296C26.8153 29.8693 27.05 29.2507 27.05 28.44V9.24V0.920001C26.41 2.02933 25.4927 2.73333 24.298 3.032C23.146 3.33067 21.93 3.48 20.65 3.48C18.9007 3.48 17.386 4.03467 16.106 5.144C14.8687 6.25333 14.25 7.61867 14.25 9.24C14.25 11.16 14.8687 12.6107 16.106 13.592C17.386 14.5307 18.9007 15 20.65 15C21.1193 15 21.546 14.9787 21.93 14.936V26.52H17.45C16.81 26.52 16.2127 26.4133 15.658 26.2C15.146 26.0293 14.7193 25.7093 14.378 25.24L11.05 31ZM20.65 10.52C20.3087 10.52 20.01 10.392 19.754 10.136C19.498 9.88 19.37 9.58133 19.37 9.24C19.37 8.89867 19.498 8.6 19.754 8.344C20.01 8.088 20.3087 7.96 20.65 7.96C20.9913 7.96 21.29 8.088 21.546 8.344C21.802 8.6 21.93 8.89867 21.93 9.24C21.93 9.58133 21.802 9.88 21.546 10.136C21.29 10.392 20.9913 10.52 20.65 10.52Z"
                            fill="#F3E9E4"
                        />
                    </svg>
                </div>
            </section>
            <section className={styles.headingsSection}>
                <h1 className={styles.firstHeading}>
                    <span className={styles.bold}>I&apos;m a</span> full-stack{' '}
                    <span className={styles.bold}>maker.</span>
                </h1>
                <h2 className={styles.secondHeading}>Experienced in both software development and product design.</h2>
                {/* <h2>Development leader who bridges the gap between code and design.</h2> */}
            </section>
            <section className={styles.projectsSection}>
                <h4 className={styles.sectionHeading}>SOME OF MY SIDE PROJECTS</h4>
                <div className={styles.projects}>
                    <Project
                        name="Sensei Academy"
                        subheading="web app for learning Japanese"
                        techUsed={[
                            'React → Router, Query, Framer Motion',
                            'Full-stack TypeScript',
                            'Node.js → Express',
                            'MongoDB → Prisma',
                            'Docker',
                            'AWS',
                            'TurboRepo',
                        ]}
                        launchURL="/sensei-academy"
                        repoURL="https://github.com/ReeceGoddard/my-portfolio/tree/master/apps"
                        backgroundImageURL="/images/project-background-2.gif"
                        backgroundImageOpacity={0.6}
                    />
                    <Project
                        name="Nutri"
                        subheading="web app for managing recipes"
                        techUsed={[
                            'React → Router, Query',
                            'TypeScript',
                            'Node.js → Express',
                            'MongoDB → Prisma',
                            'Docker',
                            'AWS',
                            'TurboRepo',
                        ]}
                        launchURL="/currency-dash"
                        repoURL="https://github.com/ReeceGoddard/my-portfolio/tree/master/apps/nutri"
                        backgroundImageURL="/images/project-background-2.gif"
                        backgroundImageOpacity={0.6}
                    />
                    <Project
                        name="FX Dash"
                        subheading="web app for viewing currency conversions"
                        techUsed={['React → Router, Query', 'TypeScript', 'Docker', 'AWS', 'TurboRepo']}
                        launchURL="/currency-dash"
                        repoURL="https://github.com/ReeceGoddard/my-portfolio/tree/master/apps/currency-dash"
                        backgroundImageURL="/images/project-background-2.gif"
                        backgroundImageOpacity={0.6}
                    />
                </div>
            </section>
            <address>
                <a className={styles.contact} href="mailto:goddard.reece@gmail.com">
                    <svg
                        className={styles.emailIcon}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" />
                    </svg>
                    <div>Email Reece</div>
                </a>
            </address>
            {/* <section className={styles.contactSection}>
                <h4 className={styles.sectionHeading}>CONTACT REECE</h4>
                <ContactForm />
            </section> */}
        </main>
    );
}
