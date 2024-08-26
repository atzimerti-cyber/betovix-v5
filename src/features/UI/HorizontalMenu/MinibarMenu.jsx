import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

import { LeftArrow, RightArrow } from './Arrows';
import { DragDealer } from './DragDealer';
import classes from './HorizontalMenu.module.css';
import Ripple from '../Ripple/Ripple';
import { translate } from '../../../utils/translations';

function MinibarMenu(props) {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

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
        props.onSelect(item, index);
    };

    let elClasses = [classes.HorizontalMenu];
    if (props.lightColor) elClasses.push(classes.LightColor);

    return (
        <div className={elClasses.join(' ')}>
            <div onMouseLeave={dragState.current.dragStop}>
                <ScrollMenu
                    // LeftArrow={LeftArrow}
                    // RightArrow={RightArrow}
                    onMouseDown={() => dragState.current.dragStart}
                    onMouseUp={() => dragState.current.dragStop}
                    onMouseMove={handleDrag}
                >
                    {props.items.map((item, index) => (
                        <button
                            key={item.Id}
                            className={props.selected === item.Id ? [classes.Item, classes.Selected].join(' ') : classes.Item}
                            onClick={handleItemClick(item, index)}
                        >
                            {/* {item.icon && <div className={classes.SportIcon}>{item.icon}</div>} */}
                            <div className={classes.SportName}>{item.Name}</div>

                            <Ripple type='square' />
                        </button>
                    ))}
                </ScrollMenu>
            </div>
        </div>
    );
}
export default MinibarMenu;
