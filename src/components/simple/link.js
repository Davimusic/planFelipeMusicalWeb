import React from 'react';
import Link from 'next/link';

const Link = ({ href, children }) => {
    return (
        <Link href={href}>
        <a>{children}</a>
        </Link>
    );
};

export default Link;
