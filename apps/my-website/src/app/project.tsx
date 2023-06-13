import Image from 'next/image';
import styles from './project.module.css';

export interface ProjectProps {
    name: string;
    subheading: string;
    techUsed: string[];
    launchURL: string;
    repoURL: string;
    backgroundImageURL?: string;
}

export const Project = ({
    name,
    subheading,
    techUsed,
    launchURL,
    repoURL,
    backgroundImageURL = '/project-background.gif',
}: ProjectProps) => {
    return (
        <div className={styles.project}>
            <Image
                className={styles.backgroundImage}
                src={backgroundImageURL}
                alt={'Cool animated background image.'}
                fill
            />
            <section className={styles.projectInfoSection}>
                <h3 className={styles.mainHeading}>{name}</h3>
                <h4 className={styles.subHeading}>{subheading}</h4>
                <ul className={styles.techUsedList}>
                    {techUsed.map(tech => (
                        <li className={styles.techUsedListItem} key={tech}>
                            {tech}
                        </li>
                    ))}
                </ul>
            </section>
            <div className={styles.actions}>
                <a className={styles.action} href={launchURL}>
                    LAUNCH APP
                </a>
                <div className={styles.separator} />
                <a className={styles.action} href={repoURL}>
                    VIEW CODE
                </a>
            </div>
        </div>
    );
};
