import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const { Handle } = Slider;

import classes from './SelectionSlider.module.css';

const SelectionSlider = (props) => {
    const handle = (handleProps) => {
        const { value, dragging, index, ...restProps } = handleProps;
        return (
            <SliderTooltip prefixCls='rc-slider-tooltip' overlay={`${value} %`} visible={dragging} placement='top' key={index}>
                <Handle value={value} {...restProps} />
            </SliderTooltip>
        );
    };

    return (
        <div className={classes.SelectionSlider}>
            <Slider min={props.min} max={props.max} defaultValue={props.defaultValue} handle={handle} onChange={props.onChange} />
        </div>
    );
};

export default SelectionSlider;
