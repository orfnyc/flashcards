import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function goToButton(pageAdress: string) {

    const navigate = useNavigate();

    const handleClick = (event) => {
        navigate('/' + pageAdress);
    };

    return(
        <>
        
        <button onClick={handleClick}>{pageAdress}</button>

        </>
    );
}

export default goToButton('Study')