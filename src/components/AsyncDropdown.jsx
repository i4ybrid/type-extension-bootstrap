/* eslint-disable react/jsx-props-no-spreading */
// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

class Asynchronous extends React.Component {
  constructor(props) {
    super(props);
    this.setOptions.bind(this);
    this.setVal.bind(this);
    this.state = {
      val: props.val,
      options: props.options,
    };
  }

  setOptions(newOptions) {
    const { val } = this.state;
    this.setState({ val, options: newOptions });
  }

  setVal(newVal) {
    const { options } = this.state;
    const { onValueChange } = this.props;
    this.setState({ val: newVal, options });
    if (typeof onValueChange === 'function') {
      onValueChange(newVal);
    }
  }

  render() {
    const { val, options } = this.state;
    const { id, label } = this.props;

    return (
      <Autocomplete
        id={id}
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        value={val}
        onInputChange={(event, value) => {
          this.setVal(value);
        }}
      />
    );
  }
}

Asynchronous.propTypes = {
  id: PropTypes.string.isRequired,
  val: PropTypes.string,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func,
};

Asynchronous.defaultProps = {
  val: '',
  label: '',
  onValueChange: () => {},
};

export default Asynchronous;
