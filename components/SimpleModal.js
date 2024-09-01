import { ReactNode } from 'react';


const SimpleModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = () => {
    onClose();
    };

    const handleContentClick = (e) => {
    e.stopPropagation();
    };

    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
        onClick={handleOverlayClick}
        >
        <div
            className={
            'relative w-[540px] h-[250px] flex-col whitespace-nowrap rounded-lg bg-white px-20 py-28 flex-center sm:h-250 sm:w-540 md:px-28'
            }
            onClick={handleContentClick}
        >
            {children}
        </div>
        </div>
    );
};

export default SimpleModal;
