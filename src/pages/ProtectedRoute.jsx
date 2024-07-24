import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

function ProtectedRoute({ element: Element }) {
    const user = getCurrentUser();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/SignIn" state={{ from: location }} replace />;
    }

    return <Element />;
}

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
