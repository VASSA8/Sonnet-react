import { useState } from 'react';
import './balance.css';

const Balance = () => {
  const [balance, setBalance] = useState(0); 

  const handleTopUp = () => {
    setBalance(balance + 100); 
  };

  return (
    <div className='balance-panel'>
      <div className='balance-content'>{balance}</div>
      <button className='top-up' onClick={handleTopUp}>
        Пополнить
      </button>
    </div>
  );
};

export default Balance;