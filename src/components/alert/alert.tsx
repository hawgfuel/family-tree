import React, { useState } from 'react';
import './alert.css';

interface AlertProps {
    message: string;
    alertType: string;
    onClose: () => void;
  }

export function Alert({message, alertType, onClose }: AlertProps){
    return(
        <div className={`alert ${alertType}`}>
            <p>{message}</p>
            <button className="close-alert" role="button" onClick={onClose}>Close X</button>
        </div>
    )
}