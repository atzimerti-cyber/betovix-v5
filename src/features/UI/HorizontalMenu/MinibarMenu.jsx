import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

import { DragDealer } from './DragDealer';
import classes from './MinibarMenu.module.css';
import Ripple from '../Ripple/Ripple';
import { translate } from '../../../utils/translations';

function MinibarMenu(props) {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const [selectedItem, setSelectedItem] = useState(null);

    const dragState = useRef(new DragDealer());
    const handleDrag =
        ({ scrollContainer }) =>
            (ev) =>
                dragState.current.dragMove(ev, (posDiff) => {
                    if (scrollContainer.current) {
                        scrollContainer.current.scrollLeft += posDiff;
                    }
                });

    const handleItemClick = (item, index) => () => {
        if (dragState.current.dragging) {
            return false;
        }
        setSelectedItem(item.Name);
        props.onSelect(item, index);
    };

    let elClasses = [classes.HorizontalMenu];
    if (props.lightColor) elClasses.push(classes.LightColor);

    return (
        <div className={elClasses.join(' ')}>
            <div onMouseLeave={dragState.current.dragStop}>
                <ScrollMenu
                    onMouseDown={() => dragState.current.dragStart}
                    onMouseUp={() => dragState.current.dragStop}
                    onMouseMove={handleDrag}
                >
                    {props.items.map((item, index) => (
                        <button
                            key={item.Id}
                            onClick={handleItemClick(item, index)}
                        >
                            {/* <div className={selectedItem === item.Name ? [classes.ItemName, classes.Selected].join(' ') : classes.ItemName}>{translate(`${item.Name}`)}</div> */}
                            <div className={classes.ItemName}>{translate(`${item.Name}`)}</div>

                            <Ripple type='square' />
                        </button>
                    ))}
                </ScrollMenu>
            </div>
        </div>
    );
}
export default MinibarMenu;
