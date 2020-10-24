import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
    // permet de ne pas ecraser le className (quand le spread operator fonctionne)
    // const { className, ...otherProps } = props;
    const { className } = props;
    let otherProps = Object.assign({}, props)
    delete otherProps["className"]

    return (
        <button
            className={`btn ${className}`}
            {...otherProps}
        >{props.children}</button>
    );
}

Button.propTypes = {
    className: PropTypes.string
}

Button.defaultProps = {
    className: ''
}
