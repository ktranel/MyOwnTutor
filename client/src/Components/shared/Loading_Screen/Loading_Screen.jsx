import React from 'react';
import ReactLoading from 'react-loading';

const Loading_Screen = ({ type, color }) => (
    <div className='t-a:c'>
        LOADING
        <ReactLoading type={type} color={color} height={70} width={70} />
    </div>
);

export default Loading_Screen;