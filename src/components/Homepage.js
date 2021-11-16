import { Search } from '@mui/icons-material';
import { Box, InputAdornment, MenuItem, Select, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Countries from "./Countries";
import Holidays from "./Holidays";
import "./Homepage.css";

const axios = require('axios');
const countriesURL = 'https://restcountries.com/v2/all?fields=flags,name,alpha3Code';
const translations = require('../translations.json');


const Homepage = () => {
	const [countries, setCountries] = useState([])
	const [input, setInput] = useState('')

	const browserNavLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
	const defaultLanguage = translations.find(lang => lang.code === browserNavLanguage);

	const [language, setLanguage] = useState(window.localStorage.getItem("selectedLanguage") || defaultLanguage.code)

	useEffect(() => {
		const getCountries = async () => {
			const resp = await axios({
				method: 'get',
				url: countriesURL
			})
			console.log(resp);
			setCountries(resp.data);
			return resp;
		}
		try {
			getCountries();
		} catch (err) {
			console.error(err)
		}

	}, [])

	const filterCountries = () => {
		return countries.filter(el => el.name.toLowerCase().includes(input.toLowerCase()) || el.alpha3Code.toLowerCase().includes(input.toLowerCase()))
	}

	const selectLanguage = (e) => {
		setLanguage(e.target.value);
		window.localStorage.setItem("selectedLanguage", e.target.value);
	}

	return (
		<Router>
			<Box className="header__box">
				<Typography className="main__heading" variant="h2" component="h1" sx={{ pt: 2, pb: 2 }} align="center">
					The Worlds' Holidays
				</Typography>
				<Box className="select__box">
					<InputLabel id="languageSelectLabel">Events Language</InputLabel>
					<Select labelId="languageSelectLabel" label="languageSelect" value={language} onChange={selectLanguage}>
						{translations.map((lang, i) => (
							<MenuItem key={i} value={lang.code}>
								{lang.name}
							</MenuItem>))}
					</Select>
				</Box>
			</Box>
			<Route path="/" exact>
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
							<p>Loading...</p>
						)}
					</Box>
				</Box>
			</Route>
			<Route path="/holidays/:code">
				<Holidays countries={countries} language={language} />
			</Route>
		</Router>
	);
}

export default Homepage
