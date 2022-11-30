import * as React from 'react';

const MenuIcon = ({
    size = 46,
    strokeWidth = 1.5,
    color = '#0b6efd',
    ...props
}) => (
    <svg
        width={size}
        height={size}
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <path d='M4.75 5.75h14.5' />
        <path d='M4.75 18.25h14.5' />
        <path d='M4.75 12h14.5' />
    </svg>
);

export default MenuIcon;
