import {
	Link
} from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar } from "@mui/material"
import "./Countries.css"

const Countries = ({ countries }) => {
	return (
		<List className="countries__list">
			{countries.map(country => (
				<ListItem
					className="countries__list-item"
					divider
					key={country.alpha3Code}
					component={Link}
					to={`/holidays/${country.alpha3Code}`}
				>
					<ListItemAvatar>
						<img alt={`Flag of ${country.name}`} src={country.flags.png}
							width="50px"
							style={{ border: "1px solid black", margin: "5px" }}
						/>
					</ListItemAvatar>
					<ListItemText primary={country.name} secondary={country.alpha3Code} />
				</ListItem>
			))}
		</List>
	)
}

export default Countries;
