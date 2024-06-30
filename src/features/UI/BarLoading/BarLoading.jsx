import classes from './BarLoading.module.css';
import { motion } from 'framer-motion';

const BarLoading = () => {
    return (
        <div className={classes.ProgressBar}>
            <motion.div
                className={classes.Bar}
                initial={{ width: 0 }}
                animate={{ width: ['0%', '10%', '18%', '22%'], opacity: [1, 1, 1, 1] }}
                exit={{ width: '100%', opacity: 1, transition: { duration: 0.3, delay: 1 } }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <div className={classes.Peg}></div>
            </motion.div>
            <div className={classes.Spinner} role='spinner'>
                <div className={classes.SpinnerIcon}></div>
            </div>
        </div>
    );
};

export default BarLoading;
