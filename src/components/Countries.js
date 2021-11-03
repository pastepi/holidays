import {
	Link
} from 'react-router-dom';

const Holidays = ({ countries }) => {
	return (
		<div>
			{countries.map(country => (
				<Link to={`/holidays/${country.alpha3Code}`} key={country.alpha3Code}>
					<p>
						<img width="30px" src={country.flags.png} alt="country flag" /> {country.name}, {country.alpha3Code}
					</p>
				</Link>
			))}
		</div>
	)
}

export default Holidays;
