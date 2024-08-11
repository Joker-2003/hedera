import React, { useState } from 'react';
import { useContext } from 'react';
import { GlobalAppContext } from '../contexts/GlobalAppContext';
import { createTickets } from '../network/api';

const TicketForm = () => {
  const [price, setPrice] = useState('');
  const [numTickets, setNumTickets] = useState(1);
  const [venue, setVenue] = useState('');
  const [ticketTokenName, setTicketTokenName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [dateAndTime, setDateAndTime] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const { metamaskAccountAddress } = useContext(GlobalAppContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append('price', price);
    formData.append('numTickets', numTickets);
    formData.append('walletId', metamaskAccountAddress);
    formData.append('venue', venue);
    formData.append('ticketTokenName', ticketTokenName);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('dateAndTime', dateAndTime);
    formData.append('description', description);
    formData.append('title', title);

    // Submit the form data to the API
    try {
      const res = await createTickets(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ticket Token Name:</label>
        <input
          type="text"
          value={ticketTokenName}
          onChange={(e) => setTicketTokenName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Number of Tickets:</label>
        <input
          type="number"
          value={numTickets}
          onChange={(e) => setNumTickets(e.target.value)}
          min="1"
          required
        />
      </div>
      <div>
        <label>Venue:</label>
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
      </div>

      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date and Time:</label>
        <input
          type="datetime-local"
          value={dateAndTime}
          onChange={(e) => setDateAndTime(e.target.value)}
          required
        />
      </div>
      
      
      <button type="submit">Create Tickets</button>
    </form>
  );
};

export default TicketForm;
