import { useTheme } from '@material-ui/core';
import React, { useState, useContext, useCallback, useRef } from 'react';

const { ipcRenderer } = require('electron');

const payload = ipcRenderer.sendSync('getData');
const AppContext = React.createContext(payload);

export function usePayload() {
  return useContext(AppContext);
}

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
  return <AppContext.Provider value={payload}>{children}</AppContext.Provider>;
}
