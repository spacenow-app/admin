import React from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';
import 'velocity-animate/velocity.ui';

const SpacenowAnimate = React.forwardRef(function SpacenowAnimate(props, ref) {
    const children = React.cloneElement(props.children, {
        style: {
            ...props.children.style,
            visibility: 'hidden'
        }
    });
    return <VelocityComponent ref={ref} {...props} children={children}/>
});

SpacenowAnimate.propTypes = {
    children: PropTypes.element.isRequired
};

SpacenowAnimate.defaultProps = {
    animation          : 'transition.fadeIn',
    runOnMount         : true,
    targetQuerySelector: null,
    interruptBehavior  : 'stop',
    visibility         : 'visible',
    duration           : 300,
    delay              : 50,
    easing             : [0.4, 0.0, 0.2, 1],
    display            : null,
    setRef             : undefined
};

export default React.memo(SpacenowAnimate);
