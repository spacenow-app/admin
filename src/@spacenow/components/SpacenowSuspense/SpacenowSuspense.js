import React from 'react';
import PropTypes from 'prop-types';
import { SpacenowLoading } from '@spacenow';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */function SpacenowSuspense(props) {
    return (
        <React.Suspense fallback={<SpacenowLoading {...props.loadingProps} />}>
            {props.children}
        </React.Suspense>
    );
}

SpacenowSuspense.propTypes = {
    loadingProps: PropTypes.object,
};

SpacenowSuspense.defaultProps = {
    loadingProps: {
        delay: 300
    }
};

export default SpacenowSuspense;
