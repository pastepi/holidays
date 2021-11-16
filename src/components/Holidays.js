import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Box, Checkbox, Button, FormControlLabel, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Holidays.css';

const axios = require('axios');
const API_KEY = '41f44369-865f-46ec-8e6b-b2783d5ded6a';

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
                    year: 2020,
                    language: language
                }
            })
            console.log(resp)
            setEvents(resp.data.holidays)
            window.localStorage.setItem(`holidays-${code}-${language}`, JSON.stringify(resp.data.holidays))
            return resp;
        }
        try {
            window.localStorage.getItem(`holidays-${code}-${language}`) ? setEvents(JSON.parse(window.localStorage.getItem(`holidays-${code}-${language}`))) : getHolidays();
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

    const handleIsPublic = (event) => {
        setIsPublic(event.target.checked)
    }

    const selectedCountry = countries.filter((item) => item.alpha3Code === code)[0]

    return (
        <Container>
            <Box className="header__box">
                <Link to="/" style={{ textDecoration: 'none' }} >
                    <Button variant="contained" startIcon={<ArrowBackIcon />}>
                        Go back
                    </Button>
                </Link>
                <Paper className="country-info__box" elevation={6} sx={{ p: 2 }}>
                    {countries.length !== 0 ? (
                        <Typography sx={{ display: "flex", alignItems: "center", fontSize: "1.5rem" }}>
                            <img className="country-flag" src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name}`} /> - {selectedCountry.name} - {code}
                        </Typography>
                    ) : (
                        <p>Loading...</p>
                    )
                    }
                </Paper>
            </Box>
            <Box className="checkbox__box">
                <FormControlLabel
                    value="start"
                    control={<Checkbox
                        checked={isPublic}
                        onChange={handleIsPublic}
                    />}
                    label="Only display public holidays:"
                    labelPlacement="start"
                />
            </Box>
            <Box className="calendar__box">
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
            </Box>
        </Container>
    )
}

export default Holidays
