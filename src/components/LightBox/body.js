import PropTypes from 'prop-types';

export default function Body({
	docId,
	comments: allComments,
	posted,
	commentInput
}) {
	// 
	return (
		<div className="flex items-center flex-col justify-center overflow-y-scroll p-3 h-full w-full">
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

Body.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired
};
