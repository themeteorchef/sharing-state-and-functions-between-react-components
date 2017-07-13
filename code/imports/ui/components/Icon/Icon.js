import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, onClick }) => (
  <i role="button" onClick={onClick} className={`fa fa-${icon}`} /> // eslint-disable-line
);

Icon.defaultProps = {
  onClick: () => {},
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Icon;
