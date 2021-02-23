export const validateEmail = (email) => {
	const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return pattern.test(email.toLowerCase());
};


export const isInputAlphaBet = (str) => {
	const pattern = /^[a-zA-Z\s]*$/;  
	return pattern.test(str);
}
export const upperCaseFullName = (str) => {
	if (str.length <= 0) return "";
	const space = str.indexOf(' ');
	if (space !== -1 && str.charAt(space + 1) !== '') {
		return (
			str[0].toUpperCase() +
			str.slice(1, space).toLowerCase().trim() +
			' ' +
			str[space + 1].toUpperCase() +
			str.slice(space + 2).toLowerCase().trim()
		);
	}
	return str[0].toUpperCase() + str.slice(1);
};
