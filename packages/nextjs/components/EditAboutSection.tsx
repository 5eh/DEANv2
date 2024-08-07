import {
  AcademicCapIcon,
  BoltIcon,
  ComputerDesktopIcon,
  FaceSmileIcon,
  GlobeAsiaAustraliaIcon,
  LanguageIcon,
  MapPinIcon,
  Bars3Icon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const EditAboutSection = ({ onClose }) => {
  const [aboutInfo, setAboutInfo] = useState({
    name: { text: "Jobs, Stevenson Job!", icon: FaceSmileIcon, color: "bg-primary/50" },
    raised: { text: "Southside Compton, the burbs.", icon: GlobeAsiaAustraliaIcon, color: "bg-green-500/50" },
    live: { text: "MODIFY", icon: MapPinIcon, color: "bg-green-500/50" },
    speak: { text: "MODIFY", icon: LanguageIcon, color: "bg-blue-500" },
    occupation: { text: "MODIFY", icon: ComputerDesktopIcon, color: "bg-orange-500" },
    education: { text: "MODIFY", icon: AcademicCapIcon, color: "bg-pink-500/50" },
  });

  const handleChange = (field, value) => {
    const updatedField = { ...aboutInfo[field], text: value };
    setAboutInfo({ ...aboutInfo, [field]: updatedField });
    console.log({
      sentence: `Updated ${field} to ${value}`,
      icon: aboutInfo[field].icon.name,
      iconColor: aboutInfo[field].color,
    });
  };

  const [newItem, setNewItem] = useState("");
  const [customItems, setCustomItems] = useState([]);

  const addNewItem = () => {
    if (newItem) {
      const newItemData = {
        text: newItem,
        icon: Bars3Icon,
        color: "bg-transparent",
      };
      setCustomItems([...customItems, newItemData]);
      setNewItem("");
      console.log({
        sentence: newItem,
        icon: "Bars3Icon",
        iconColor: "bg-primary/30",
      });
    }
  };

  const handleDeleteCustomItem = index => {
    const newCustomItems = customItems.filter((_, i) => i !== index);
    setCustomItems(newCustomItems);
  };

  const handleCustomItemChange = (index, value) => {
    const updatedItem = { ...customItems[index], text: value };
    const newCustomItems = customItems.map((item, i) => (i === index ? updatedItem : item));
    setCustomItems(newCustomItems);
    console.log({
      sentence: value,
      icon: customItems[index].icon.name,
      iconColor: customItems[index].color,
    });
  };

  const handleSubmit = () => {
    const fullInfo = {
      aboutInfo,
      customItems,
    };
    console.log(JSON.stringify(fullInfo, null, 2));
    console.log("Update success");
    onClose();
  };

  return (
    <div className="pl-4 pr-4">
      <div className="max-h-[60vh] overflow-y-auto">
        {Object.keys(aboutInfo).map(key => {
          const Icon = aboutInfo[key].icon;
          return (
            <div
              key={key}
              className="w-full flex items-center gap-4 pb-1 relative group hover:bg-primary/10 p-2 rounded-md mt-4"
            >
              <div className="relative">
                <div
                  className={`relative w-16 h-16 ${aboutInfo[key].color} rounded-full flex items-center justify-center border border-black group-hover:bg-primary/10`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="flex-1">
                {key === "name" && (
                  <span>
                    Hi, my name&apos;s{" "}
                    <input
                      type="text"
                      value={aboutInfo[key].text}
                      onChange={e => handleChange(key, e.target.value)}
                      className="code text-primary bg-transparent border-none outline-none w-full"
                    />
                  </span>
                )}
                {key === "raised" && (
                  <span>
                    I was raised in{" "}
                    <input
                      type="text"
                      value={aboutInfo[key].text}
                      onChange={e => handleChange(key, e.target.value)}
                      className="code text-primary bg-transparent border-none outline-none w-full"
                    />
                  </span>
                )}
                {key === "live" && (
                  <span>
                    I currently live in{" "}
                    <input
                      type="text"
                      value={aboutInfo[key].text}
                      onChange={e => handleChange(key, e.target.value)}
                      className="code text-primary bg-transparent border-none outline-none w-full"
                    />
                  </span>
                )}
                {key === "speak" && (
                  <span>
                    I speak{" "}
                    <input
                      type="text"
                      value={aboutInfo[key].text}
                      onChange={e => handleChange(key, e.target.value)}
                      className="code text-primary bg-transparent border-none outline-none w-full"
                    />
                  </span>
                )}
                {key === "occupation" && (
                  <span>
                    My occupation{" "}
                    <input
                      type="text"
                      value={aboutInfo[key].text}
                      onChange={e => handleChange(key, e.target.value)}
                      className="code text-primary bg-transparent border-none outline-none w-full"
                    />
                  </span>
                )}
                {key === "education" && (
                  <span>
                    I recently completed education at{" "}
                    <input
                      type="text"
                      value={aboutInfo[key].text}
                      onChange={e => handleChange(key, e.target.value)}
                      className="code text-primary bg-transparent border-none outline-none w-full"
                    />
                  </span>
                )}
              </p>
            </div>
          );
        })}

        {customItems.map((item, index) => (
          <div
            key={index}
            className="w-full flex items-center gap-4 pb-1 relative group hover:bg-primary/10 p-2 rounded-md"
          >
            <div className="relative">
              <div
                className={`relative w-16 h-16 ${item.color} rounded-full flex items-center justify-center border border-white group-hover:bg-primary/10`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <input
              type="text"
              value={item.text}
              onChange={e => handleCustomItemChange(index, e.target.value)}
              className="code text-primary bg-transparent border-none outline-none flex-1"
            />
            <XCircleIcon
              className="w-6 h-6 text-red-300 border border-red-300 rounded-full cursor-pointer"
              onClick={() => handleDeleteCustomItem(index)}
            />
          </div>
        ))}
      </div>

      <div className="w-full flex items-center gap-4 pb-1 relative group hover:bg-primary/10 p-2 rounded-md mt-4">
        <div className="relative">
          <div className="relative w-16 h-16 bg-white/50 rounded-full flex items-center justify-center border border-white group-hover:bg-primary/10">
            <Bars3Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        <input
          type="text"
          placeholder="Add custom item"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          className="code text-primary bg-transparent border-none outline-none flex-1"
        />
        <button onClick={addNewItem} className="bg-primary text-white rounded px-2 py-1">
          Add
        </button>
      </div>

      <div className="bg-primary/10 hover:bg-primary/30 border border-primary mt-4">
        <button onClick={handleSubmit} className="w-full h-12">
          UPDATE CHANGES
        </button>
      </div>
    </div>
  );
};

export default EditAboutSection;
