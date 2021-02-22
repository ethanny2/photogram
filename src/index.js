import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FieldValue, firebase } from './lib/firebase';
import FirebaseConfig from './context/firebase';

/* Don't pass too many things as value prop to provider. B/C its at root level
if any value in the provider is changed it will trigger the entire tree to re-render.*/

ReactDOM.render(
	<FirebaseConfig.Provider value={{ firebase, FieldValue }}>
		<App />
	</FirebaseConfig.Provider>,
	document.getElementById('root')
);
