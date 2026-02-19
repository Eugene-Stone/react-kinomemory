import { useParams, useOutletContext } from 'react-router-dom';

import React from 'react';

export default function Film() {
	const { id } = useParams();

	return <div>Film</div>;
}
