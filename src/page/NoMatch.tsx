import React from 'react';
import { useLocation } from "react-router-dom";

const NoMatch = () => {
    let location = useLocation();

    return (
        <div>
            Страница с параметром <code>{location.pathname}</code> не найдена.
        </div>
    );
};

export default NoMatch;
