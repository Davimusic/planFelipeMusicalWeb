import React from 'react';
import Link from 'next/link';

const Link = ({id, href, children }) => {
    return (
        <Link id={id} href={href}>
        <a>{children}</a>
        </Link>
    );
};

export default Link;
