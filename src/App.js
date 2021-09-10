import React from 'react';
import Home from './components/Home';
import { ClippyProvider } from './components/agents/Clippy';
import { BonziProvider } from './components/agents/Bonzi';

function App() {
  return (
    <>
      <ClippyProvider>
        <BonziProvider showOnLoad={false}>
          <Home />
        </BonziProvider>
      </ClippyProvider>
    </>
  );
}

export default App;
