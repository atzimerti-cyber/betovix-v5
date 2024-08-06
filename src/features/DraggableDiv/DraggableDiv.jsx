import { useRef, useState, forwardRef  } from 'react';
import classes from './DraggableDiv.module.css';

const DraggableDiv = forwardRef((props, ref) => {
    const parentRef = ref || useRef(null); 
    // const parentRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ left: 0, x: 0 });

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartPosition({
            left: parentRef.current.scrollLeft,
            x: e.clientX,
        });
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startPosition.x;
        parentRef.current.scrollLeft = startPosition.left - dx;
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onTouchStart = (e) => {
        setIsDragging(true);
        setStartPosition({
            left: parentRef.current.scrollLeft,
            x: e.touches[0].clientX,
        });
    };

    const onTouchMove = (e) => {
        if (!isDragging) return;

        const dx = e.touches[0].clientX - startPosition.x;
        parentRef.current.scrollLeft = startPosition.left - dx;
    };

    const onTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            className={classes.DraggableDiv}
            ref={parentRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {props.children}
        </div>
    );
});

export default DraggableDiv;
