"use client";
import { useState } from "react";
import Popup from "~~/components/Popup";

const HomePage = () => {
  const [isPopupOpen1, setPopupOpen1] = useState(false);

  const togglePopup1 = () => {
    setPopupOpen1(!isPopupOpen1);
  };

  return (
    <div>
      <button onClick={togglePopup1} className="px-4 py-2 bg-blue-500 text-white rounded">
        Open Popup 1
      </button>

      <Popup
        isOpen={isPopupOpen1}
        onClose={togglePopup1}
        className="min-w-96 min-h-64 max-w-full max-h-full"
        title={<Popup.Title className="pl-3 pr-3 uppercase code">Popup 1 Title</Popup.Title>}
      >
        <p className="pl-3 pr-3">This is the content of the first popup.</p>
        <p className="pl-3 pr-3">This is the content of the first popup.</p>

        <p className="pl-3 pr-3">This is the content of the first popup.</p>
      </Popup>
    </div>
  );
};

export default HomePage;
