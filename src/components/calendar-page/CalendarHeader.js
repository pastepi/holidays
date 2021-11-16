import { Box, Checkbox, Button, FormControlLabel, Paper, Typography, CircularProgress } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import '../../css/CalendarHeader.css';

const CalendarHeader = ({ countries, code, isPublic, onCheck }) => {

    const selectedCountry = countries.filter((item) => item.alpha3Code === code)[0];

    return (
        <>
            <Box className="header__box">
                <Button
                    className="link__button"
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    component={Link}
                    to={"/"}>
                    Go back
                </Button>
                <Paper className="country-info__box" elevation={6}>
                    {countries.length !== 0 ? (
                        <Typography component="h2" variant="h5" className="country-info__typography">
                            <img className="country-flag" src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name}`} />  {selectedCountry.name} - {code}
                        </Typography>
                    ) : (
                        <CircularProgress />
                    )
                    }
                </Paper>
            </Box>
            <Box className="checkbox__box">
                <FormControlLabel
                    value="start"
                    control={<Checkbox
                        checked={isPublic}
                        onChange={(e) => onCheck(e)}
                    />}
                    label="Only display public holidays:"
                    labelPlacement="start"
                />
            </Box>
        </>
    )
}

export default CalendarHeader
