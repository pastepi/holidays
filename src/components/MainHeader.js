import { Box, MenuItem, Select, InputLabel, Typography } from '@mui/material';
import '../css/MainHeader.css';

const MainHeader = ({ translations, language, onSelect }) => {
    return (
        <Box className="header__box">
            <Typography className="main__heading" variant="h2" component="h1" sx={{ pt: 2, pb: 2 }} align="center">
                The Worlds' Holidays
            </Typography>
            <Box className="select__box">
                <InputLabel id="languageSelectLabel">Events Language</InputLabel>
                <Select labelId="languageSelectLabel" label="languageSelect" value={language} onChange={(e) => onSelect(e)}>
                    {translations.map((lang, i) => (
                        <MenuItem key={i} value={lang.code}>
                            {lang.name}
                        </MenuItem>))}
                </Select>
            </Box>
        </Box>
    )
}

export default MainHeader
