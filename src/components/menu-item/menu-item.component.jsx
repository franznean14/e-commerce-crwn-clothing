import React from 'react';
import { Link } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size, linkUrl}) => (
    
        <div className={`${size} menu-item`}>
                <div   
                    style={{
                        backgroundImage: `url(${imageUrl})`
                    }}
                    className='background-image'></div>
                    <div className='content'>
                        <h1 className='title'>{title.toUpperCase()}</h1>
                        <Link to={`/${linkUrl}`}>
                            <span className='subtitle'>SHOP NOW</span>
                        </Link>
                    </div>
        </div>
)

export default MenuItem;