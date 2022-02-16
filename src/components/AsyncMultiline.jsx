// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

class Asynchronous extends React.Component {
  constructor(props) {
    super(props);
    this.setVal.bind(this);
    this.onFormat.bind(this);
    this.state = {
      val: props.val,
    };
  }

  onFormat(event) {
    const { onFormat } = this.props;
    onFormat(event);
  }

  setVal(newVal) {
    const { onValueChange } = this.props;
    this.setState({ val: newVal });
    if (typeof onValueChange === 'function') {
      onValueChange(newVal);
    }
  }

  render() {
    const { val } = this.state;
    const { id, label } = this.props;

    return (
      <TextField
        variant="outlined"
        multiline
        style={{ width: 380 }}
        minRows={2}
        maxRows={8}
        id={id}
        label={label}
        name={id}
        autoComplete={id}
        value={val}
        inputProps={{ style: { fontFamily: 'Monospace' } }}
        onBlur={(event) => this.onFormat(event)}
        onChange={(event) => {
          this.setVal(event.target.value);
        }}
      />
    );
  }
}

Asynchronous.propTypes = {
  id: PropTypes.string.isRequired,
  val: PropTypes.string,
  label: PropTypes.string,
  onValueChange: PropTypes.func,
  onFormat: PropTypes.func,
};

Asynchronous.defaultProps = {
  val: '',
  label: '',
  onValueChange: () => {},
  onFormat: () => {},
};

export default Asynchronous;
