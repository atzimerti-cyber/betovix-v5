import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { initSportsbook } from './sportsbookAsyncActions';
import classes from './SportsBook.module.css';
import SportsBookMenu from './features/SportsBookMenu';
import SportsHome from './subpages/SportsHome';
import SportsLive from './subpages/SportsLive';
import SportsUpcoming from './subpages/SportsUpcoming';
import SportsOutrights from './subpages/SportsOutrights';
import Banners from '../../features/Banners/Banners';
import { sportsbookActions } from './sportsbookSlice';

const SportsBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const sportBanners = useSelector((state) => state.sportsbook.sportBanners);

    const [showBanners, setShowBanners] = useState(true); // New state to control visibility
    const handleRemoveBannersComponent = () => { setShowBanners(false); };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(initSportsbook(signal));

        if (params['*'] === '') navigate('/sportsbook/home', { replace: true });

        return () => {
            controller.abort();
            dispatch(sportsbookActions.reset());
        };
    }, []);

    let page = <SportsHome />;
    if (params['*'].includes('live')) page = <SportsLive />;
    if (params['*'].includes('upcoming')) page = <SportsUpcoming />;
    else if (params['*'].includes('outrights')) page = <SportsOutrights />;

    return (
        <div className={classes.PageContent}>
            <div className={classes.SportsBook}>
                <div className={classes.MenuWrapper}>
                    <SportsBookMenu />
                </div>

                <div className={classes.Content}>
                    <div className={classes.SportsBookInner}>
                        {!params['*'].includes('live') && !params['*'].includes('outrights') && <Banners onDataNotFound={handleRemoveBannersComponent} banners={sportBanners} />}
                        {page}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportsBook;
