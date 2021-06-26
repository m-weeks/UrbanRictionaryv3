import React, { useEffect, useState } from 'react';
import clippy from 'clippyjs';

const ClippyContext = React.createContext();

const loadClippy = () => {
  return new Promise((resolve, reject) => {
    clippy.load('Clippy', resolve, reject, '/assets/agents/')
  });
}

const ClippyProvider = (props) => {
  const { children } = props;
  
  const [myAgent, setMyAgent] = useState();

  useEffect(() => {
    (async () => {
      const agent = await loadClippy();

      agent.show();

      setMyAgent(agent);
    })();
  }, [])

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
    <ClippyContext.Provider value={myAgent}>
      {children}
    </ClippyContext.Provider>
  )
};

export default ClippyProvider;

export { ClippyContext }