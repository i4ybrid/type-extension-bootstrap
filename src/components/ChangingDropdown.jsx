/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

class DynamicDropdown extends React.Component {
  constructor(props, context) {
    super(props);
    this.props = props;
    this.context = context;
  }

  setOptions(options) {
    this.props.options = options;
    this.render();
  }

  render() {
    const { options, identity, label } = this.props;
    return (
      <div>
        <Autocomplete
          id={identity}
          options={options}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={() => <TextField label={label} variant="outlined" />}
        />
      </div>
    );
  }
}

DynamicDropdown.defaultProps = {
  options: [],
  identity: undefined,
  label: '',
};

DynamicDropdown.propTypes = {
  options: PropTypes.array,
  identity: PropTypes.string,
  label: PropTypes.string,
};

export default DynamicDropdown;
