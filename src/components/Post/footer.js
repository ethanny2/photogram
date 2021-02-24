export default function Footer({ username, caption }) {
	return (
		<footer className='p-4 pt-2 pb-0'>
			<span className='mr-1 font-bold'>{username}</span>
			<span>{caption}</span>
		</footer>
	);
}
