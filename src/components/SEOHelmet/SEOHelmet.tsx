import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

interface SEOHelmetProps{
    title?: string;
    description?: string;
    type?: string;
    name?: string;
    url?: string;
};

const SEOHelmet:FC<SEOHelmetProps> = ({
    title,
    description,
    type,
    name,
    url
}) => {
  return (
    <Helmet>
        { /* Standard metadata tags */ }
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name='description' content={description} />
        { /* End standard metadata tags */ }

        <meta property="og:url" content={url} />
        
        { /* Facebook tags */ }
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        { /* End Facebook tags */ }

        { /* Twitter tags */ }
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:card" content={type} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        { /* End Twitter tags */ }

        </Helmet> 
  )
};

export default SEOHelmet;