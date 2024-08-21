
import './EventCreatedCard.scss';

import React, { useContext,useState } from 'react';
import { GlobalAppContext } from "../../contexts/GlobalAppContext";
import { CartContext } from '../../contexts/CartContext';
import { useSnackbar } from '../../contexts/SnackbarContext'; // Import the useSnackbar hook

import EventPlaceHolderImage from '../../assets/eventPlaceholderImage.png';
import cartImg from '../../assets/shoppingCart.svg';
import { client } from '../../pages/TicketHome/TicketHome';
import { checkIfUserHasNft } from '../../services/hederaService';
import { claimFunds } from '../../network/api';

export default function EventCreatedCard({ event }) {
    const { metamaskAccountAddress } = useContext(GlobalAppContext);
    const { addToCart , cart} = useContext(CartContext); 
    const { showSnackbar } = useSnackbar(); // Get the showSnackbar function
	const [disableButton, setDisableButton] = React.useState(false);
	const [forceFetch, setForceFetch] = useState(false);

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
	const renderDecimalValue = (decimalObject) => {
		if (decimalObject && decimalObject.$numberDecimal) {
			return decimalObject.$numberDecimal;
		}
		return decimalObject; // or return a default value like "0"
	};

    const handleTranferRevenue = async() => {
		setDisableButton(true);
		if (!metamaskAccountAddress) {
			showSnackbar('Please connect your wallet to transfer revenue.', 'error');
			setDisableButton(false);
			return;
		}
		try{
			const res = await claimFunds(metamaskAccountAddress, event.eventID);
			showSnackbar(`Revenue for ${event.title} transferred successfully!`, 'success');

		}
		catch (error) {
			showSnackbar(`There was an error transferring revenue for ${event.title}`, 'error');
		}
		finally
		{
			event.claimable = 0;
			setDisableButton(false);
		}
		
	}
    return (
        <div className="event-card-1">
            <div className="event-card-image-1">
                <img  alt={"cart"}  src={`${process.env.REACT_APP_PINATA_GATEWAY}/ipfs/${event.image.substring(7)}`} />
            </div>

            <div className="event-card-container-1">
                <div className='event-card-info-1'>
                    <p>{formattedDate}
                        <br />
                        {event.venue} | {event.city}, {event.country}
						<br/>
						<br/>
						<span>Total Revenue: {event.totalRevenue} Hbar</span>
						<br/>
						<span>Total Service Tax (@15%): {event.serviceTax} Hbar</span>
						<br/>
						<span>Total Net Revenue: {event.netRevenue} Hbar</span>
						<br />
						<br />
						<span>Revenue Already Transferred: {renderDecimalValue(event.paymentClaimed)} Hbar</span>
						<br />
						<span>Claimable Revenue: {renderDecimalValue(event.claimable)} Hbar</span>
                    </p>
                    <h4>{event.description}</h4>
                    <h3>{event.title}</h3>
					
                 
                </div>
                <div className='event-card-buy-1'>
					<p>Tickets sold: {event.ticketsSold} of {event.totalTickets} </p>
                    { (renderDecimalValue(event.claimable) >0) ? <button disabled={disableButton} onClick={handleTranferRevenue}>
                        CLAIM
                    </button>
                    : <button disabled>
                       NO CLAIMS
                    </button>
                    }
                </div>
            </div>
        </div>
    );
}