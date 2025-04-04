import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import classes from './ShowTrxId.module.css';
import CloseButton from '../../../features/UI/Buttons/CloseButton';
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { translate } from '../../../utils/translations';
import CopyToClipboardCont from '../../../features/CopyToClipboard/CopyToClipboardCont';

const ShowTrxId = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const TrxId = useSelector((state) => state.crypto.TrxId); // Necessary for rerendering translations
  const TrxLink = useSelector((state) => state.crypto.TrxLink); // Necessary for rerendering translations

  return (
    <div className={classes.ShowTrxId}>
      <AnimatePresence>
        <motion.div className={classes.Overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <div className={classes.Close} onClick={props.onClose}></div>

          <div className={classes.Content}>
            <div className={classes.Header}>
              <div className={classes.Title}>
                <CoinsIcon />
                <h2>{translate('Transaction Id')}</h2>
              </div>
              <div className={classes.CloseButton}>
                <CloseButton timesIcon color='transparent' onClick={props.onClose} />
              </div>

            </div>

            <div className={classes.ContentInner}>
              <div><span>{translate('Request Id')}: <i>#{props.requestId ? props.requestId : ''}</i></span></div>
              <div><span className={classes.TrxSpan}>{translate('Trx Id')}: <i> <CopyToClipboardCont text={TrxId} /></i></span></div>
            {TrxLink && TrxLink !== null && (
              <div>
                <span className={classes.SpanLink}>{translate('See your transaction details here')}: {" "}  
              <a href={TrxLink} target="_blank" rel="noopener noreferrer"> {TrxLink}</a>
              </span>
              </div>
            )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ShowTrxId;
