import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import CalendarHeader from './CalendarHeader';

const axios = require('axios');
const API_KEY = '42efc471-859a-461a-b6a7-b1e1f420f5fa';

const Holidays = ({ countries, language }) => {
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
                    year: new Date().getFullYear() - 1,         // 1 Year behind - API limitation
                    language: language
                }
            })
            setEvents(resp.data.holidays)
            window.sessionStorage.setItem(`holidays-${code}-${language}`, JSON.stringify(resp.data.holidays))
            return resp;
        }
        try {
            window.sessionStorage.getItem(`holidays-${code}-${language}`) ? setEvents(JSON.parse(window.sessionStorage.getItem(`holidays-${code}-${language}`))) : getHolidays();
        } catch (err) {
            console.error(err);
        }
    }, [code, language])

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

    const handleIsPublic = (e) => {
        setIsPublic(e.target.checked)
    }

    return (
        <Container>
            <CalendarHeader countries={countries} code={code} isPublic={isPublic} onCheck={handleIsPublic} />
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                initialDate={new Date().setFullYear(new Date().getFullYear() - 1)}
                events={displayEvents()}
                fixedWeekCount={true}
                expandRows={true}
                contentHeight={600}
                headerToolbar={
                    {
                        left: '',
                        center: 'title',
                        right: 'prev today next'
                    }
                }
            />
        </Container>
    )
}

export default Holidays
