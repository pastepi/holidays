import { useState, useEffect } from 'react'
import {
    useParams,
    Link
} from 'react-router-dom'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const axios = require('axios');
const API_KEY = '41f44369-865f-46ec-8e6b-b2783d5ded6a';


const Holidays = ({ countries }) => {
    const { code } = useParams();
    const [events, setEvents] = useState([]);
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        const getHolidays = async () => {
            const resp = await axios({
                method: 'get',
                url: 'https://holidayapi.com/v1/holidays',
                params: {
                    key: API_KEY,
                    country: code,
                    year: 2020
                }
            })
            console.log(resp)
            setEvents(resp.data.holidays)
            return resp;
        }
        try {
            getHolidays();
        } catch(err) {
            console.error(err);
        }
    }, [code])

    const displayEvents = () => {
        const mappedEvents = events.map((e) => {
            return {
                title: e.name,
                date: e.date,
                allDay: true,
                public: e.public,
                color: e.public && "rgb(217, 33, 45)"
            }
        })
        return isPublic ? mappedEvents.filter((e) => e.public) : mappedEvents
    }

    const handleIsPublic = (event) => {
        setIsPublic(event.target.checked)
    }
    
    const selectedCountry = countries.filter((item) => item.alpha3Code === code)[0]
    
    return (
        <div>
            <Link to="/">
                <p>Go Back</p>
            </Link>
            {countries.length !== 0 ? (
                    <p>Calendar - <img width="30px" src={selectedCountry.flags.png} alt="Country flag"/> - { selectedCountry.name } - { code } </p>
                ) : (
                    <p>Loading...</p>
                )
            }
            Only display public holidays: 
            
            <input
                type="checkbox"
                checked={isPublic}
                onChange={handleIsPublic}
            />
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={displayEvents()}
            />
        </div>
    )
}

export default Holidays
