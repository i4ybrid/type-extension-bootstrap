/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button,
  TextField,
  CssBaseline,
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const { ipcRenderer } = require('electron');

const versions = [
  { title: '310', value: 310 },
  { title: '311', value: 311 },
];

const documents = [
  { title: 'Order', version: '310' },
  { title: 'PlanningSchedule', version: '311' },
];

const events = [
  { title: 'On Save', value: 'onSave' },
  { title: 'On Create', version: 'onCreate' },
  { title: 'On Validate', version: 'onValidate' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: 'fullWidth',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function getElementValue(elementName, fallbackValue) {
  let returnVal;
  if (fallbackValue) {
    returnVal = fallbackValue;
  }
  const element = document.getElementById(elementName);
  if (element) {
    returnVal = element.value;
  }
  return returnVal;
}

const submitForm = () => {
  const formData = {
    documentType: getElementValue('documentType'),
    typeExtensionRank: getElementValue('typeExtensionRank'),
    apiVersion: getElementValue('apiVersion'),
    typeExtensionFunctionName: getElementValue('typeExtensionFunctionName'),
    moduleName: getElementValue('moduleName'),
    event: getElementValue('event'),
  };
  ipcRenderer.send('buttonClicked', formData);
};

export default function QuestionForm() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <form className={classes.form} id="teForm">
          <Grid
            item
            container
            spacing={2}
            justifyContext="center"
            alignItems="center"
          >
            <Grid item>
              <Autocomplete
                id="apiVersion"
                options={versions}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Version" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                id="documentType"
                options={documents}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Document Type"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                style={{ width: 300 }}
                id="typeExtensionRank"
                label="Type Extension Rank"
                name="typeExtensionRank"
                autoComplete="typeExtensionRank"
                defaultValue="10"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                style={{ width: 300 }}
                id="typeExtensionFunctionName"
                label="TE Function Name"
                name="typeExtensionFunctionName"
                autoComplete="typeExtensionFunctionName"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                style={{ width: 300 }}
                id="moduleName"
                label="Module Name"
                name="moduleName"
                autoComplete="moduleName"
              />
            </Grid>
            <Grid item>
              <Autocomplete
                id="event"
                options={events}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Events" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  submitForm();
                  handleToggle();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Container>
  );
}
