import React from 'react';
import useUser from '../../hooks/useUser';

export default function Sidebar() {
	const {
		user: { docId, userId, following, username, fullName } = {}
	} = useUser();

	return <p>I am the sidebar</p>;
}
