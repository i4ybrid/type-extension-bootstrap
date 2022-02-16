/* eslint-disable no-empty */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button,
  CssBaseline,
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AsyncTextField from '../components/AsyncTextField';
import AsyncMultiline from '../components/AsyncMultiline';
import { usePayload } from '../components/AppContext';

const { ipcRenderer } = require('electron');

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
}));

const createTypeExtensionFolder = (payload) => {
  ipcRenderer.send('createTypeExtensionFolder', payload);
};

const saveData = (payload) => {
  ipcRenderer.send('saveData', payload);
};

const minify = (text) => {
  try {
    const jsonObject = JSON.parse(text);
    return JSON.stringify(jsonObject);
  } catch (e) {}
  return undefined;
};

const beautify = (text) => {
  try {
    const jsonObject = JSON.parse(text);
    return JSON.stringify(jsonObject, null, 2);
  } catch (e) {}
  return undefined;
};

export default function StatefulForm() {
  const payload = usePayload();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const closeOverlay = () => {
    setOpen(false);
  };
  const toggleOverlay = () => {
    setOpen(!open);
  };

  ipcRenderer.on('toggleOverlay', toggleOverlay);
  ipcRenderer.on('closeOverlay', closeOverlay);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <form className={classes.form} id="teForm">
          <Grid item container spacing={2} alignItems="center">
            <Grid item>
              <AsyncTextField
                id="customerKey"
                label="Customer Shorthand"
                val={payload.customerKey}
                onValueChange={(newValue) => {
                  payload.customerKey = newValue;
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  saveData(payload);
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid item>
              <AsyncTextField
                id="moduleName"
                label="Module Name"
                val={payload.moduleName}
                onValueChange={(newValue) => {
                  payload.moduleName = newValue;
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  saveData(payload);
                  createTypeExtensionFolder(payload);
                  toggleOverlay();
                  setTimeout(closeOverlay, 2500);
                }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              <AsyncMultiline
                id="targetObjectData"
                label="Target Object Data"
                val={payload.testData}
                onValueChange={(newValue) => {
                  payload.targetObjectData = newValue;
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  payload.targetObjectData = minify(payload.targetObjectData);
                  // TODO trigger refresh using useState
                }}
              >
                Minify
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  payload.targetObjectData = beautify(payload.targetObjectData);
                  // TODO trigger refresh using useState
                }}
              >
                Beautify
              </Button>
            </Grid>
            <Grid item>
              <AsyncMultiline
                id="seedData"
                label="Seed Data (don't format)"
                val={payload.seedData}
                onValueChange={(newValue) => {
                  payload.seedData = newValue;
                }}
              />
            </Grid>
          </Grid>
        </form>
      </div>
      <div>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={closeOverlay}
          style={{ zIndex: 0 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Container>
  );
}
