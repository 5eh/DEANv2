// components/Popup.tsx
import { FC, ReactNode, MouseEvent } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface PopupTitleProps {
  children: ReactNode;
  className?: string;
}

const Popup: FC<PopupProps> & { Title: FC<PopupTitleProps> } = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  style = {},
}) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg transition-opacity duration-300"
      onClick={handleOutsideClick}
    >
      <div
        className={`relative border border-transparent dark:border-primary bg-white dark:bg-black/80 pb-3 rounded-sm shadow-md transform transition-all duration-300 ${className}`}
        style={style}
      >
        <div className="text-left pt-2  border border-transparent dark:border-b-primary border-b-gray-500">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const Title: FC<PopupTitleProps> = ({ children, className = "" }) => (
  <h2 className={`text-xl font-bold text-left ${className}`}>{children}</h2>
);

Popup.Title = Title;

export default Popup;
