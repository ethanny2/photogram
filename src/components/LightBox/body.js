import PropTypes from 'prop-types';

export default function Media({
	docId,
	comments: allComments,
	posted,
	commentInput
}) {
	return (
		<div className="overflow-y-scroll	">
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga </p>			
		</div>
	);
}

Media.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired
};
