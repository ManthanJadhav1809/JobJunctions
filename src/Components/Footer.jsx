import React, { useEffect, useState } from 'react';
import './Footer.css';

function Footer() {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        const pageViews = localStorage.getItem('pageViews') || 0;
        const newPageViews = parseInt(pageViews) + 1;
        localStorage.setItem('pageViews', newPageViews);
        setViewCount(newPageViews);
    }, []);

    return (
        <footer className="footer">
            <p>Page Views: {viewCount}</p>
        </footer>
    );
}

export default Footer;
