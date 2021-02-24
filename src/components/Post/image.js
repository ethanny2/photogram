export default function Image({ src, caption }) {
	return (
		<figure className='post__img'>
			<img src={src} alt={caption} />
		</figure>
	);
}
