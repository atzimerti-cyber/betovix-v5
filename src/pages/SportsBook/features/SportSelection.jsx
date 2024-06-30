import classes from './SportSelection.module.css';
import HorizontalMenu from '../../../features/UI/HorizontalMenu/HorizontalMenu';

const SportSelection = (props) => {
    return (
        <menu className={classes.SportSelection}>
            <div className={classes.MenuContent}>
                {props.items && props.selectedSport && (
                    <HorizontalMenu
                        items={props.items}
                        selected={props.selectedSport.Id}
                        onSelect={(sport) => props.onSelectSport(sport)}
                        withCount={props.withCount}
                    />
                )}
            </div>
        </menu>
    );
};

export default SportSelection;
