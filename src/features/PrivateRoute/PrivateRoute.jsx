import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { getAccessToken } from '../../utils/auth';
import NotAuthenticated from './NotAuthenticated';

const PrivateRoute = ({ roleId, children }) => {
    const location = useLocation();
    const user = useSelector((state) => state.login.user);
    // const token = getAccessToken();
    const [isAllowed, setIsAllowed] = useState(null);

    useEffect(() => {
        let allowed = false;

        if (roleId && user && user.Role <= roleId) allowed = true;
        else if (user && !roleId) allowed = true;

        setIsAllowed(allowed);
    }, [user?.AccountId, location]);

    let page = null;
    if (isAllowed) page = children;
    else if (isAllowed === false) page = <NotAuthenticated />;

    return page;
};

export default PrivateRoute;
