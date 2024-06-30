import Search2Icon from '../../assets/svgs/search2.svg?react';
import classes from './Search2.module.css';

const Search = (props) => {
    return (
        <div className={classes.InputBox}>
            <Search2Icon />

            <input
                role='search'
                type='search'
                name='search'
                autoComplete='off'
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

export default Search;
