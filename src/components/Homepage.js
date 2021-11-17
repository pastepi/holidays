import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Holidays from "./calendar-page/Holidays";
import MainHeader from "./MainHeader";
import CountryList from "./CountryList";

const axios = require('axios');
const countriesURL = 'https://restcountries.com/v2/all?fields=flags,name,alpha3Code';
const translations = require('../translations.json');


const Homepage = () => {
	const [countries, setCountries] = useState([])

	const browserNavLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
	const defaultLanguage = translations.find(lang => lang.code === browserNavLanguage);

	const [language, setLanguage] = useState(window.localStorage.getItem("selectedLanguage") || defaultLanguage.code)
	
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

	useEffect(() => {
		const getCountries = async () => {
			const resp = await axios({
				method: 'get',
				url: countriesURL
			})
			setCountries(resp.data);
			return resp;
		}
		try {
			sleep(500).then(() => getCountries());
		} catch (err) {
			console.error(err)
		}

	}, [])

	const selectLanguage = (e) => {
		setLanguage(e.target.value);
		window.localStorage.setItem("selectedLanguage", e.target.value);
	}

	return (
		<Router>
			<MainHeader translations={translations} language={language} onSelect={selectLanguage} />
			<Route path="/" exact>
				<CountryList countries={countries} />
			</Route>
			<Route path="/holidays/:code">
				<Holidays countries={countries} language={language} />
			</Route>
		</Router>
	);
}

export default Homepage
