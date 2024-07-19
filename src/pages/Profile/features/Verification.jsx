import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import classes from './Verification.module.css';
import MainButton2 from '../../../features/UI/Buttons/MainButton2';
import { translate } from '../../../utils/translations';

const Verification = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

    return (
        <motion.div className={classes.TabContent} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className={classes.Form}>
                <div className={classes.FormGroup}>
                    <p className={classes.Title}>{translate('Verification')}</p>
                    <p className={classes.Text}>{translate('A verified email address is required to access some parts of the website.')}</p>

                    <div className={classes.Container}>
                        <input id='useremail' readOnly type='text' value={user?.Email} />
                    </div>

                    <MainButton2 onClick={() => console.log('VERIFY')}>
                        <span>{translate('Verify')}</span>
                    </MainButton2>
                </div>
            </div>
        </motion.div>
    );
};

export default Verification;
