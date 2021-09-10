import React, { useEffect, useState, useRef } from 'react';
import clippy from 'clippyjs';


const loadAgent = (agent) => {
  return new Promise((resolve, reject) => {
    clippy.load(agent, resolve, reject, '/assets/agents/')
  });
}

export const AgentProvider = (props) => {
  const { children, ContextProvider, agentName, showOnLoad = true } = props;
  
  const [myAgent, setMyAgent] = useState();

  const showOnLoadRef = useRef(showOnLoad);

  useEffect(() => {
    (async () => {
      const agent = await loadAgent(agentName);

      if (showOnLoadRef.current) {
        agent.show();
      }

      setMyAgent(agent);
    })();
  }, [agentName])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!myAgent) {
        myAgent.animate();
      }
    }, 15000);

    return () => {
      clearInterval(interval);
    }
  }, [myAgent])

  return (
    <ContextProvider value={myAgent}>
      {children}
    </ContextProvider>
  )
};

export default AgentProvider;