import React from 'react';
import { AgentProvider } from '../AgentProvider';

const ClippyContext = React.createContext();

const ClippyProvider = (props) => {
  const { children } = props;

  return (
    <AgentProvider ContextProvider={ClippyContext.Provider} agentName="Clippy">
      {children}
    </AgentProvider>
  )
};

export default ClippyProvider;

export { ClippyContext }