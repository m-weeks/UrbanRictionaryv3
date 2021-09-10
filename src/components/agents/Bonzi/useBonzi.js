import { useContext } from 'react';
import { BonziContext } from './BonziProvider';

const useBonzi = () => {
  return useContext(BonziContext);
}

export default useBonzi;

