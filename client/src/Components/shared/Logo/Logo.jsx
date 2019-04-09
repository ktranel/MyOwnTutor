import React from 'react';
import Logo from '../../Images/MyOwnTutorLogo.png';
import LogoStyles from './Logo.module.css';

export const large = () =>{
    return(
        <img className={LogoStyles.large} src={Logo} alt="Logo"/>
    )
}

export const medium = () =>{
    return(
        <img className={LogoStyles.medium} src={Logo} alt="Logo"/>
    )
}

export const small = () =>{
    return(
       <img className={LogoStyles.small} src={Logo} alt="Logo"/>
    )
}