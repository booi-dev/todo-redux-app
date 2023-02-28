/* eslint-disable*/

import React from 'react';
import './BackDrop.css';

function BackDrop(props) {
    const { handler, brightness = 3 } = props;

    return (
        <div className='back-drop'
            role='button'
            onClick={() => handler()}
        />
    );
}

export default BackDrop;