import GoogleIcon from '../../../assets/svgs/google.svg?react';
import SteamIcon from '../../../assets/svgs/steam.svg?react';
import classes from './AlternativeMethods.module.css';

const AlternativeMethods = () => {
    return (
        <div className={classes.AlternativeMethods}>
            <button type='button' title='Log in with Google'>
                <GoogleIcon />
            </button>
            <button type='button'disabled title='Login with Steam'>
                <SteamIcon />
            </button>
        </div>
    );
};

export default AlternativeMethods;
