import { useState } from "react";
import { Box, InputAdornment, TextField, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import Countries from "./Countries";
import "../css/CountryList.css"


const CountryList = ({ countries }) => {
    const [input, setInput] = useState('')

    const filterCountries = () => {
        return countries.filter(el => el.name.toLowerCase().includes(input.toLowerCase()) || el.alpha3Code.toLowerCase().includes(input.toLowerCase()))
    }

    return (
        <Box className="list__box">
            <Box className="countries-list__box">
                <TextField
                    className="searchInput__textField"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    label="Search for a country"
                    variant="filled"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />
                {countries.length !== 0 ? (
                    <Countries countries={filterCountries()} />
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70vh"}}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default CountryList
