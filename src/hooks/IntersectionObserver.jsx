import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (threshold = 0.3, user) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Stop observing this element, but keep the observer active
                }
            });
        }, { threshold });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold, user]);

    return { isVisible, elementRef };
};

export default useIntersectionObserver;
