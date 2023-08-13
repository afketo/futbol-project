import { useRef, useEffect } from 'react';

const useEscapeFirstRender = (func, deps) => {
    const firstRender = useRef(false);

    useEffect(() => {
        if (firstRender.current) func();
        else firstRender.current = true;
    }, [deps]);
}

export default useEscapeFirstRender