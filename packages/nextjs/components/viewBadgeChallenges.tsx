import clsx from "clsx";

interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const allChallenges: Challenge[] = [
  {
    id: "editFullAccount",
    title: "Edit Full Account",
    description: "Complete your profile by adding all necessary information.",
    completed: false,
  },
  {
    id: "confirmEmail",
    title: "Confirm Email",
    description: "Verify your email address to secure your account.",
    completed: false,
  },
  {
    id: "connectCustomWallet",
    title: "Connect Custom Wallet",
    description: "Link your custom wallet to start making transactions.",
    completed: false,
  },
  {
    id: "purchaseYourFirstItem",
    title: "Purchase Your First Item",
    description: "Make your first purchase on the platform.",
    completed: false,
  },
  {
    id: "leaveAReview",
    title: "Leave a Review",
    description: "Review an item you purchased to help others make informed decisions.",
    completed: false,
  },
  {
    id: "followASeller",
    title: "Follow a Seller",
    description: "Follow a seller to stay updated on their latest products.",
    completed: false,
  },
  {
    id: "addShippingAddress",
    title: "Add a Shipping Address",
    description: "Save your shipping address for faster checkouts.",
    completed: false,
  },
  {
    id: "setUpNotifications",
    title: "Set Up Notifications",
    description: "Customize your notifications to stay informed.",
    completed: false,
  },
];

const ViewBadgeChallenges: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const closeButton = () => {
    onClose();
  };

  return (
    <div className="p-4">
      <div className="grid-cols-4 grid gap-2">
        {allChallenges.map(challenge => (
          <div
            key={challenge.id}
            className={clsx(
              "w-90 h-90 text-left transition hover:ease-in-out",
              "bg-primary/20",
              "hover:bg-primary/30",
              "border-primary/80",
              "hover:border-primary",
              "border",
            )}
          >
            <p className="w-full code pl-3 border-white">{challenge.title}</p>
            <p className="w-full code pl-3">{challenge.description}</p>
            <div className="flex items-center mt-4 h-12">
              <p className="w-full code pl-3">COMPLETED?</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary/10 hover:bg-primary/30 border border-primary mt-4">
        <button onClick={closeButton} className="w-full h-12">
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default ViewBadgeChallenges;
