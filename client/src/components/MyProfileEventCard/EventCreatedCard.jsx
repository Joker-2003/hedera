import '../EventCard/EventCard.scss';
import './EventCreatedCard.scss';


import './EventCard.scss';

import React, { useContext } from 'react';
import { GlobalAppContext } from "../../contexts/GlobalAppContext";
import { CartContext } from '../../contexts/CartContext';
import { useSnackbar } from '../../contexts/SnackbarContext'; // Import the useSnackbar hook

import EventPlaceHolderImage from '../../assets/eventPlaceholderImage.png';
import cartImg from '../../assets/shoppingCart.svg';
import { client } from '../../pages/TicketHome/TicketHome';
import { checkIfUserHasNft } from '../../services/hederaService';

export default function EventCreatedCard({ event }) {
    const { metamaskAccountAddress } = useContext(GlobalAppContext);
    const { addToCart , cart} = useContext(CartContext); 
    const { showSnackbar } = useSnackbar(); // Get the showSnackbar function

    let formattedDate = "";
 
    if (event.dateAndTime) {
        const date = new Date(event.dateAndTime);
        formattedDate = date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    const handleTranferRevenue = () => {
		if (!metamaskAccountAddress) {
			showSnackbar('Please connect your wallet to transfer revenue.', 'error');
			return;
		}
		showSnackbar(`Revenue for ${event.title} transferred successfully!`, 'success');
	}
    return (
        <div className="event-card">
            <div className="event-card-image">
                <img  alt={"cart"}  src={`${process.env.REACT_APP_PINATA_GATEWAY}/ipfs/${event.image.substring(7)}`} />
            </div>

            <div className="event-card-container">
                <div className='event-card-info'>
                    <p>{formattedDate}
                        <br />
                        {event.venue} | {event.city}, {event.country}
                    </p>
                    <h4>{event.description}</h4>
                    <h3>{event.title}</h3>
                 
                </div>
                <div className='event-card-buy'>
				<p>Total Revenue: {event.totalRevenue}</p>
				<p>Total Service Tax (@15%): {event.serviceTax}</p>
				<p>Total Net Revenue: {event.netRevenue}</p>
                    { (event.totalTickets > event.ticketsSold) ? <button onClick={handleTranferRevenue}>
                        TRANSFER
                    </button>
                    : <button disabled>
                       SOLD OUT
                    </button>
                    }
                </div>
            </div>
        </div>
    );
}