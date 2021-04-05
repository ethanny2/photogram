import { useRef } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';

const OutsideModalWrapper = ({ children, onDismiss }) => {
	const wrapperRef = useRef(null);
	useOutsideClick(wrapperRef, onDismiss);
	return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideModalWrapper;
