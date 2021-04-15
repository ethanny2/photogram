import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FieldValue, firebase, FieldPath } from './lib/firebase';
import FirebaseContext from './context/firebase';

/* Don't pass too many things as value prop to provider. B/C its at root level
if any value in the provider is changed it will trigger the entire tree to re-render.*/

ReactDOM.render(
	<FirebaseContext.Provider value={{ firebase, FieldValue, FieldPath }}>
		<App />
	</FirebaseContext.Provider>,
	document.getElementById('root')
);
