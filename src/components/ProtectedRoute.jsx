
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

function ProtectedRoute({ element }) {
    const user = getCurrentUser();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return element;
}

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
