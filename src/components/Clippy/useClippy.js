import { useContext } from 'react';
import { ClippyContext } from './ClippyProvider';

const useClippy = () => {
  return useContext(ClippyContext);
}

export default useClippy;

