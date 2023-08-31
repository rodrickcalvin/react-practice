import React, { createContext } from 'react';
import '@/styles/globals.css';

export const ConfigContext = createContext();

const configValue = {
  showSignMeUp: true,
  showSpeakerSpeakingDays: true
}

export default function App({ Component, pageProps }) {
  return (
    <ConfigContext.Provider value={configValue}>
      <Component {...pageProps} />
    </ConfigContext.Provider>
  )
}
