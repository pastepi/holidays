import Countries from "./Countries";
import Holidays from "./Holidays";
import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";

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
			<div>
				<h1>The Worlds' Holidays</h1>
				<Route
					path="/"
					exact
					render={() => (
						<>
							<input
								type="text"
								value={input}
								onChange={event => setInput(event.target.value)}
							/>
                            { countries.length !== 0 ? (
                                <Countries countries={filterCountries()} />
                            ) : (
                                <p>Loading...</p>
                            )}
						</>
					)}
				/>
				<Route path="/holidays/:code">
					<Holidays countries={countries}/>
				</Route>
			</div>
		</Router>
    );
}

export default Homepage
