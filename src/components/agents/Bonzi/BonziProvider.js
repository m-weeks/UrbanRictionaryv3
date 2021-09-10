import React from 'react';
import {  AgentProvider } from '../AgentProvider';

const BonziContext = React.createContext();

const BonziProvider = (props) => {
  const { children, ...otherProps } = props;

  return (
    <AgentProvider {...otherProps} ContextProvider={BonziContext.Provider} agentName="Bonzi" >
      {children}
    </AgentProvider>
  )
};

export default BonziProvider;

export { BonziContext }