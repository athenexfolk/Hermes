import { useState } from "react";
import OnlineBadge from "../../../components/DotBadge";
import { ChatContact } from "../../../models/chat-contact";

interface ChatHeaderProps {
    forContact: ChatContact;
    settings: (isOpen: boolean) => void;
}

function ChatHeader({ forContact, settings }: ChatHeaderProps) {
    const [openStatus, setOpenStatus] = useState(true);

    const onClickSettings = () => {
        settings(openStatus);
        setOpenStatus(!openStatus);
    };

    return (

    );
}

export default ChatHeader;
<nav
            className="px-6 py-3 shadow flex items-center justify-between sticky top-0 z-10"
        >
            <div className="flex gap-3 items-center">
                <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full object-cover overflow-hidden relative"></div>
                    <div className="absolute right-0 bottom-0">
                        <OnlineBadge />
                    </div>
                </div>
                <div>
                    <p className="text-xl font-bold">{forContact.chatName}</p>
                    <p className="text-xs">Online</p>
                </div>
            </div>
            <button onClick={onClickSettings} className="p-2 hover:bg-gray-100 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                </svg>
            </button>
        </nav>
