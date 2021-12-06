import { useEffect } from 'react';

const HideScrollbar = () => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);
    return null;
};

export default HideScrollbar;
