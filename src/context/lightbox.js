import { createContext } from 'react';

const LightboxContext = createContext({
	visible: false,
	onDismiss: () => {},
	content: null,
});
export default LightboxContext;
