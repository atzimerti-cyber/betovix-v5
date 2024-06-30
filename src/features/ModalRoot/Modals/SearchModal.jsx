import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import classes from './SearchModal.module.css';
import { getSlots, getCasinoSearch } from '../../../pages/Search/searchAsyncActions';
import { searchActions } from '../../../pages/Search/searchSlice';
import Search3 from '../../Search/Search3';
import useDebounce from '../../../hooks/useDebounce';
import Search2Icon from '../../../assets/svgs/search2.svg?react';
import CloseButton from '../../UI/Buttons/CloseButton';
import CasinoGames from '../features/CasinoGames';

const SearchModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const casinoResults = useSelector((state) => state.search.casinoResults);
    const loading = useSelector((state) => state.search.loading);
    const searchString = useSelector((state) => state.search.searchString);

    const [axiosController, setAxiosController] = useState(null);
    const debSearchString = useDebounce(searchString);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);

        dispatch(getSlots(signal, 10));

        return () => {
            if (axiosController) axiosController.abort();
            dispatch(searchActions.reset());
        };
    }, []);

    useEffect(() => {
        if (!isMobile) navigate('/search');
    }, [isMobile]);

    useEffect(() => {
        if (!axiosController) return;

        dispatch(searchActions.setCasinoResults(null));

        if (debSearchString === '') {
            dispatch(getSlots(axiosController.signal, 10));
        } else {
            dispatch(getCasinoSearch(axiosController.signal, debSearchString));
        }
    }, [debSearchString, axiosController]);

    return (
        <div className={classes.SearchModal}>
            <div className={classes.ModalContent}>
                <header className={classes.ModalHeader}>
                    <span className={classes.TitleContainer}>
                        <h1>
                            <Search2Icon />
                            Search
                        </h1>
                    </span>
                    <span className={classes.CloseWrapper}>
                        <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
                    </span>
                </header>

                <div className={classes.SearchContainer}>
                    <Search3
                        placeholder='Search Casino'
                        searchStr={searchString}
                        onChange={(value) => dispatch(searchActions.setSearchString(value))}
                        fullFontSize
                    />
                </div>

                <CasinoGames collection={casinoResults} loading={loading} searchString={debSearchString} />
            </div>
        </div>
    );
};

export default SearchModal;
