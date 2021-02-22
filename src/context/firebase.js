import {createContext} from 'react';

/* Used to persist firebase state so we don't reinitialize it.
Wrap our root component with a provider for this context*/

/* We don't create a HOC component to wrap the provider because the context
itself has a FirebaseContext.Provider built in. We choose the value passed in then*/
const FirebaseContext = createContext(null);
export default FirebaseContext;