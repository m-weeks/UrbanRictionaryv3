import React from 'react';
import Home from './components/Home';
import { ClippyProvider } from './components/Clippy';

function App() {
  return (
    <>
      <ClippyProvider>
        <Home />
      </ClippyProvider>
    </>
  );
}

export default App;
