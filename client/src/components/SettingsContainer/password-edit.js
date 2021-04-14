import PropTypes from 'prop-types';
// import LoggedInUserContext from '../../context/logged-in-user';
import { useEffect, useContext } from 'react';
import { NavLink, Route, useRouteMatch, Switch } from 'react-router-dom';

export default function PasswordEdit() {
	let { path, url } = useRouteMatch();
	console.log({ path });
	console.log({ url });
  	// Will be inside this div
    //<div className='col-span-4 flex flex-col justify-start items-center'>  
    //</div>
	return (
    <p>This is the edit password page</p>
	);
}
