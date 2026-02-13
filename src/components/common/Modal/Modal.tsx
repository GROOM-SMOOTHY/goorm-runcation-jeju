import React from "react";
import { createPortal } from "react-dom";
import "@components/common/Modal/Modal.css";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const ModalRoot: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    className,
}) => {
    if (!isOpen) return null;

    const modalRoot = document.getElementById("modal-root");

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    };

    const modalContent = (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            role="presentation"
        >
            <div
                className={`modal-dialog ${className ?? ""}`.trim()}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </div>
    );

    return createPortal(modalContent, modalRoot ?? document.body);
};

export interface ModalHeaderProps {
    children: React.ReactNode;
    className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
    children,
    className,
}) => (
    <header
        className={`modal-header ${className ?? ""}`.trim()}
    >
        {children}
    </header>
);

export interface ModalContentProps {
    children: React.ReactNode;
    className?: string;
}

const ModalContent: React.FC<ModalContentProps> = ({
    children,
    className,
}) => (
    <div
        className={`modal-content ${className ?? ""}`.trim()}
    >
        {children}
    </div>
);

export interface ModalFooterProps {
    children: React.ReactNode;
    className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => (
    <footer className={`modal-footer ${className ?? ""}`.trim()}>
        {children}
    </footer>
);

export const Modal = Object.assign(ModalRoot, {
    Header: ModalHeader,
    Content: ModalContent,
    Footer: ModalFooter,
});

export default Modal;
