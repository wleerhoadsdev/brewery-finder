import React from 'react';
import './NotAuthorized.css';

export default function NotAuthorized(props) {
    const message = props.message
        ? props.message
        : 'You are not authorized to view this page.';
    return (
        <main id='not-authorized__message'>
            <div className='main__content-panel'>
                <h1 className='heading'>{message}</h1>
            </div>

            <div className='main__image-panel'>
                <img
                    src='https://thumbs.dreamstime.com/b/colored-sad-beer-glass-icon-vector-illustration-design-colored-sad-beer-glass-icon-127079527.jpg'
                    alt={'error'}
                />
            </div>
        </main>
    );
}
