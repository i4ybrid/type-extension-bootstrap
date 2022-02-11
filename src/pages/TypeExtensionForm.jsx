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
import { makeStyles, alpha } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AsyncDropdown from '../components/AsyncDropdown';
import AsyncTextField from '../components/AsyncTextField';
import { usePayload } from '../components/AppContext';

const { ipcRenderer } = require('electron');
const documentTypeData = require('../../lib/constants/documentTypes.json');
const {
  flattenDocuments,
  flattenEvents,
  flattenRoles,
  inlineReplaceArray,
} = require('../util/pageUtils');

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

const saveData = (payload) => {
  ipcRenderer.send('saveData', payload);
};

const downloadPlatormModuleZip = (payload) => {
  ipcRenderer.send('saveData', payload);
  ipcRenderer.send('downloadTypeExtensionZip');
};

export default function TypeExtensionForm() {
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
              <AsyncDropdown
                id="apiVersion"
                options={payload.apiVersion.options}
                label="Version"
                val={payload.apiVersion.label}
                onValueChange={(newVersion) => {
                  payload.apiVersion.label = newVersion;
                  payload.apiVersion.value = newVersion;
                  inlineReplaceArray(
                    payload.documentType.options,
                    flattenDocuments(documentTypeData, newVersion)
                  );
                }}
              />
            </Grid>
            <Grid item>
              <AsyncDropdown
                id="documentType"
                options={payload.documentType.options}
                label="Document Type"
                val={payload.documentType.label}
                onValueChange={(newDocument) => {
                  payload.documentType.label = newDocument;
                  payload.documentType.value =
                    documentTypeData[newDocument].documentType;
                  inlineReplaceArray(
                    payload.event.options,
                    flattenEvents(documentTypeData, newDocument)
                  );
                }}
              />
            </Grid>
            <Grid item>
              <AsyncTextField
                id="typeExtensionRank"
                label="Type Extension Rank"
                val={payload.typeExtensionRank}
                onValueChange={(newValue) => {
                  payload.typeExtensionRank = newValue;
                }}
              />
            </Grid>
            <Grid item>
              <AsyncTextField
                id="typeExtensionFunctionName"
                label="TE Function Name"
                val={payload.typeExtensionFunctionName}
                onValueChange={(newValue) => {
                  payload.typeExtensionFunctionName = newValue;
                }}
              />
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
              <AsyncDropdown
                id="event"
                options={payload.event.options}
                label="Event"
                val={payload.event.label}
                onValueChange={(newEvent) => {
                  payload.event.label = newEvent;
                  payload.event.value = newEvent;
                  inlineReplaceArray(
                    payload.role.options,
                    flattenRoles(documentTypeData, newEvent)
                  );
                  payload.role.value = '';
                  payload.role.label = '';
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  console.log(JSON.stringify(payload, null, 2));
                  saveData(payload);
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid item>
              <AsyncDropdown
                id="role"
                options={payload.role.options}
                label="Role"
                val={payload.role.label}
                onValueChange={(newRole) => {
                  payload.role.label = newRole;
                  payload.role.value = newRole;
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  downloadPlatormModuleZip(payload);
                  toggleOverlay();
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
          onClick={closeOverlay}
          style={{ zIndex: 0 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Container>
  );
}
