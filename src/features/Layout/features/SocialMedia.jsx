import React from 'react';
import { useSelector } from 'react-redux';
import classes from './SocialMedia.module.css';
import FacebookIcon from '../../../assets/svgs/facebook.svg?react';
import InstagramIcon from '../../../assets/svgs/instagram.svg?react';
import TiktokIcon from '../../../assets/svgs/tiktok.svg?react';
import TwitterIcon from '../../../assets/svgs/twitter.svg?react';
import YouTubeIcon from '../../../assets/svgs/youtube.svg?react';
import LinkedInIcon from '../../../assets/svgs/linkedin.svg?react';

const SocialMedia = () => {
    const social = useSelector((state) => state.app.socialMedia);

    const iconMapping = {
        FacebookUrl: <FacebookIcon />,
        InstagramUrl: <InstagramIcon />,
        TiktokUrl: <TiktokIcon />,
        TwitterUrl: <TwitterIcon />,
        YouTubeUrl: <YouTubeIcon />,
        LinkedinUrl: <LinkedInIcon />,
    };

    if (!social) return null;

    const socialMediaLinks = Object.keys(social)
        .filter(key => key.endsWith('Url'))
        .map(key => ({
            url: social[key],
            icon: iconMapping[key], 
        }))
        .filter(media => media.url && media.icon); 

    return (
        <div className={classes.SocialSm}>
            {socialMediaLinks.map((media, index) => (
                <a
                    key={index}
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.SocialLink}
                >
                    {media.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialMedia;

