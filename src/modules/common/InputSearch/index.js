
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class InputSearch extends PureComponent {
  render() {
    const {
      value,
      onChange,
      placeholder,
    } = this.props;
    return (
      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    )
  }
};

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputSearch;
