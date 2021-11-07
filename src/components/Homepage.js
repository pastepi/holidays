import Countries from "./Countries";
import Holidays from "./Holidays";
import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";
import { TextField, InputAdornment, Typography, Container } from '@mui/material';
import { Search } from '@mui/icons-material';

const axios = require('axios');
const countriesURL = 'https://restcountries.com/v2/all?fields=flags,name,alpha3Code';


const Homepage = () => {
    const [countries, setCountries] = useState([])
	const [input, setInput] = useState('')

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
		} catch(err) {
			console.error(err)
		}

	}, [])

	const filterCountries = () => {
		return countries.filter(el => el.name.toLowerCase().includes(input.toLowerCase()) || el.alpha3Code.toLowerCase().includes(input.toLowerCase()))
	}

    return (
		<Router>
			<Container maxWidth="sm" sx={{ maxHeight: "100vh", borderLeft: 2, borderRight: 2 }}>
				<Typography variant="h2" component="h1" sx={{ pt: 2, pb: 2 }} align="center">
					The Worlds' Holidays
				</Typography>
				<Route
					path="/"
					exact
					render={() => (
						<>
							<Container>
								<TextField
									type="text"
									color="primary"
									value={input}
									onChange={event => setInput(event.target.value)}
									label="Search for a country"
									variant="filled"
									fullWidth
									InputProps = {{ 
										endAdornment: (
											<InputAdornment position="end">
												<Search />
											</InputAdornment>
										)
									}}
								/>
								{ countries.length !== 0 ? (
									<Countries countries={filterCountries()} />
								) : (
									<p>Loading...</p>
								)}
							</Container>
						</>
					)}
				/>
				<Route path="/holidays/:code">
					<Holidays countries={countries}/>
				</Route>
			</Container>
		</Router>
    );
}

export default Homepage
