import { useState } from "react";
import { ChatType } from "../../../models/chat";
import GroupPanel from "./GroupPanel";
import PrivatePanel from "./PrivatePanel";

function AddConnector() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [chatType, setChatType] = useState<ChatType>(ChatType.PRIVATE);

    const openAddModal = () => {
        setIsOpenAddModal(true);
    };

    const closeAddModal = () => {
        setIsOpenAddModal(false);
    };

    const changeChatType = (type: ChatType) => {
        setChatType(type);
    };

    return (
        <>
            <button
                onClick={openAddModal}
                className="flex items-center p-3 rounded-full hover:bg-gray-100"
            >
                {AddChatIcon()}
            </button>
            {isOpenAddModal && (
                <div className="fixed top-0 left-0 h-screen w-screen z-40">
                    <div className="w-full h-full bg-black/25 backdrop-blur flex justify-center items-center p-6">
                        <div className="relative bg-white rounded-lg p-6 pt-14 shadow max-w-sm w-full">
                            <button
                                onClick={closeAddModal}
                                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                            >
                                {XMarkIcon()}
                            </button>
                            <div className="mb-4">
                                <ul className="grid grid-cols-2 gap-2 font-semibold">
                                    <li
                                        onClick={() =>
                                            changeChatType(ChatType.PRIVATE)
                                        }
                                        className={`flex justify-center items-center cursor-pointer border-b-4 px-4 py-2 hover:bg-gray-50 ${
                                            chatType === ChatType.PRIVATE
                                                ? "border-gray-500"
                                                : "border-transparent"
                                        }`}
                                    >
                                        Private
                                    </li>
                                    <li
                                        onClick={() =>
                                            changeChatType(ChatType.GROUP)
                                        }
                                        className={`flex justify-center items-center cursor-pointer border-b-4 px-4 py-2 hover:bg-gray-50 ${
                                            chatType === ChatType.GROUP
                                                ? "border-gray-500"
                                                : "border-transparent"
                                        }`}
                                    >
                                        Group
                                    </li>
                                </ul>
                            </div>
                            {chatType === ChatType.PRIVATE ? (
                                <PrivatePanel />
                            ) : (
                                <GroupPanel />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const AddChatIcon = () => (
    <svg
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        class="w-8 h-8"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9 12H12M15 12H12M12 12V9M12 12V15"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const XMarkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export default AddConnector;
