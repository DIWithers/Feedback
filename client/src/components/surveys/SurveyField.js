import React from 'react';

export default ({ input, label }) => { //E6 extraction of input from 'props'
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    );
};