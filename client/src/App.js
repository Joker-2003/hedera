import React from 'react';
import TicketForm from './components/TicketForm';
import { MetaMaskWallet } from './components/MetaMaskWallet';
import TicketHome from './TicketHome';
import { GlobalAppContextProvider } from './contexts/GlobalAppContext';

function App() {
  return (
    <GlobalAppContextProvider>
    <div className="App">
      <h1>Hedera Ticket Booking System</h1>
      <TicketForm />
    
      <TicketHome/>
    </div>
    </GlobalAppContextProvider>
  );
}

export default App;
