import React from 'react';

const FaceRecogonition = ({imageURL}) => {
	return (
		<div className= 'center ma'>
			<div className='absolute mt2'>
				<img alt= '' src={imageURL} width='500px' height='auto'/>
			</div>
		</div>
		);
}

export default FaceRecogonition;