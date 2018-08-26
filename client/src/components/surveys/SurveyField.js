import React from 'react';

export default ({ input }) => { //E6 extraction of input from 'props'
    return (
        <div>
            <input {...input} />
        </div>
    );
};