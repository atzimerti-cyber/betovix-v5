import { useState } from 'react';
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';

import classes from './DraggableBox.module.css';
import CloseButton from '../Buttons/CloseButton';

const DraggableBox = (props) => {
    const [activeDrags, setActiveDrags] = useState(0);
    const [dragging, setDragging] = useState(false);

    const onStart = () => {
        setActiveDrags((prev) => prev + 1);
        setDragging(true);
    };

    const onStop = () => {
        setActiveDrags((prev) => prev - 1);
        setDragging(false);
    };

    const dragHandlers = { onStart, onStop };

    return (
        <Draggable handle='.draggableHeader' bounds='parent' {...dragHandlers} cancel='button'>
            <div className={classes.DraggableBox}>
                <AnimatePresence>
                    <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
                        <div
                            className={dragging ? [classes.DraggableBoxInner, classes.Dragging].join(' ') : classes.DraggableBoxInner}
                            style={props.height ? { height: props.height + 'px' } : null}
                        >
                            <div className='draggableHeader'>
                                <header>
                                    <div className={classes.Title}>{props.title}</div>
                                    <CloseButton timesIcon onClick={props.onClose} />
                                </header>
                            </div>
                            <div className={classes.Content}>{props.children}</div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Draggable>
    );
};

export default DraggableBox;
