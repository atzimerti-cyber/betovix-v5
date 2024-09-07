import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (threshold = 0.3) => {
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
    }, [threshold]);

    return { isVisible, elementRef };
};

export default useIntersectionObserver;

// const useIntersectionObserver = (threshold = 0.3) => {
//     const [isVisible, setIsVisible] = useState(false);
//     const elementRef = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach((entry) => {
//                 setIsVisible(entry.isIntersecting);
//             });
//         }, { threshold });

//         if (elementRef.current) {
//             observer.observe(elementRef.current);
//         }

//         return () => {
//             if (elementRef.current) {
//                 observer.unobserve(elementRef.current);
//             }
//         };
//     }, [threshold]);

//     return { isVisible, elementRef };
// };

// export default useIntersectionObserver;
// const useIntersectionObserver = (threshold = 0.3) => {
//     const [isVisible, setIsVisible] = useState(false);
//     const elementRef = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true);
//                     observer.unobserve(entry.target); // Stop observing this element, but keep the observer active
//                 }
//             });
//         }, { threshold });

//         if (elementRef.current) {
//             observer.observe(elementRef.current);
//         }

//         return () => {
//             if (elementRef.current) {
//                 observer.unobserve(elementRef.current);
//             }
//         };
//     }, [threshold]);

//     return { isVisible, elementRef };
// };

// export default useIntersectionObserver;

