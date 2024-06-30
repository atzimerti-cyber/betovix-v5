import { useNavigate, useLocation } from 'react-router-dom';

import classes from './ModalHeader.module.css';
import CloseButton from '../../UI/Buttons/CloseButton';

const ModalHeader = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={classes.ModalHeader}>
            <div className={classes.ModalHeaderCenter}>
                {props.icon}
                <h2>{props.title}</h2>
            </div>

            <div className={classes.ModalHeaderRight}>
                <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
            </div>
        </div>
    );
};

export default ModalHeader;
