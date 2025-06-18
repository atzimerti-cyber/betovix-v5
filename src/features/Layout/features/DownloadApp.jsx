import React from 'react';
import { useSelector } from 'react-redux';
import classes from './DownloadApp.module.css';

const DownloadApp = () => {
    const app = useSelector((state) => state.app.app);

    if (!app) return null;

    const appLinks = [];

    for (let i = 1; i <= 10; i++) {
        const img = app[`AppImg${i}`];
        const link = app[`AppLink${i}`];

        if (img && link) {
            appLinks.push({ img, link });
        } else {
            break;
        }
    }

    return (
        <div className={classes.DownloadAppWrapper}>
            {appLinks.map((item, index) => (
                <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.DownloadAppLink}
                >
                    <img src={item.img} alt={`App Link ${index + 1}`} />
                </a>
            ))}
        </div>
    );
};

export default DownloadApp;


