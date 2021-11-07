import {
	Link
} from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar } from "@mui/material"

const Holidays = ({ countries }) => {
	return (
		<List>
			{countries.map(country => (
				<ListItem 
					inset
					divider 
					key={country.alpha3Code}
					component={Link} 
					to={`/holidays/${country.alpha3Code}`} 
					secondaryAction={country.alpha3Code}
					color="primary"
				>
					<ListItemAvatar>
						<img alt={`Flag of ${country.name}`} src={country.flags.png} 
							width="50px"
							style={{ border: "1px solid black", margin: "5px" }} 
						/>
					</ListItemAvatar>
					<ListItemText primary={country.name} />
				</ListItem>
			))}
		</List>
	)
}

export default Holidays;
