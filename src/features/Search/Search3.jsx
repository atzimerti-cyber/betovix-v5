import SearchIcon from '../../assets/svgs/search.svg?react';
import TimesIcon from '../../assets/svgs/times.svg?react';
import classes from './Search3.module.css';

const Search3 = (props) => {
    let elClasses = [classes.SearchContainer];
    if (props.iconLeft) elClasses.push(classes.IconLeft);
    if (props.fullFontSize) elClasses.push(classes.FullFontSize);

    return (
        <div className={elClasses.join(' ')}>
            <input
                role='search'
                type='search'
                name='search'
                autoComplete='off'
                placeholder={props.placeholder}
                value={props.searchStr || ''}
                onChange={(e) => props.onChange(e.target.value)}
            />

            {props.iconLeft ? (
                <span className={classes.LeftIcon}>
                    <SearchIcon />
                </span>
            ) : props.searchStr ? (
                <span className={[classes.RightIcon, classes.DeleteIcon].join(' ')} onClick={() => props.onChange('')}>
                    <TimesIcon />
                </span>
            ) : (
                <span className={classes.RightIcon}>
                    <SearchIcon />
                </span>
            )}
        </div>
    );
};

export default Search3;
