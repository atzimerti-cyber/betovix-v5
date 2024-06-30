import { useSelector } from 'react-redux';

const useTranslation = (key) => {
    const translations = useSelector((state) => state.app.translations);

    return translations[key] || key;
};

export default useTranslation;
