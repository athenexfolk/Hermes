import { useState } from "react";
import Brand from "./Brand/Brand";
import ChatContactList from "./ChatContact/ChatContactList";
import SearchBar from "./Searchbar/Searchbar";
import ConnectorFilter from "./ChatContactFilter/ConnectorFilter";
import MainSettings from "./MainSettings/MainSettings";
import OwnerPanel from "./OwnerPanel/OwnerPanel";
import AddConnector from "./AddConnector/AddConnector";
import { useLoaderData } from "react-router-dom";
import { ChatContact } from "../../models/chat-contact";
import { ChatType } from "../../models/chat";

function Sidebar() {
    const [isMainSettingsOpen, setIsMainSettingsOpen] = useState(false);
    const loadedChats = useLoaderData() as ChatContact[];

    const [chats, setChats] = useState(loadedChats);

    const filterChat = (filter: ChatType | null) => {
        setChats(
            filter !== null
                ? loadedChats.filter((chat) => chat.type === filter)
                : loadedChats
        );
    };

    const openMainSettings = () => {
        setIsMainSettingsOpen(!isMainSettingsOpen);
    };
    const closeMainSettings = () => {
        setIsMainSettingsOpen(!isMainSettingsOpen);
    };

    return (
        <div className="grow-0 shrink-0 w-96 h-screen border-r relative">
            <div>
                <div className="flex items-center justify-between px-6 py-3">
                    <Brand />
                    <AddConnector />
                </div>
                <div className="px-6 py-3">
                    <div className="mb-3">
                        <SearchBar />
                    </div>
                    <ConnectorFilter filterEmitter={filterChat} />
                </div>
                <div
                    className="overflow-y-auto"
                    style={{ height: "calc( 100vh - 256px )" }}
                >
                    <ChatContactList chats={chats} />
                </div>
            </div>
            <MainSettings
                openStatus={isMainSettingsOpen}
                emitCloseEvent={closeMainSettings}
            />
            <OwnerPanel emitOpenEvent={openMainSettings} />
        </div>
    );
}

export default Sidebar;
