import { useRef, useState } from "react";
import ConnectorCard from "./ConnectorCard";
import { User } from "../../../models/user";
import {
    addPrivateChat,
    getProfile,
} from "../../../services/connector-service";

function PrivatePanel() {
    const [isSearchFound, setIsSearchFound] = useState<boolean | null>(null);
    const [foundProfile, setFoundProfile] = useState<User | null>(null);

    const tmpForm = useRef<HTMLInputElement>(null);

    const search = () => {
        setIsSearchFound(true);
        if (tmpForm?.current && tmpForm.current.value.length) {
            getProfile(tmpForm.current?.value)
                .then(setFoundProfile)
                .catch(() => {
                    setIsSearchFound(false);
                    setFoundProfile(null);
                });
        }
    };

    const addConnector = (user: User) => {
        addPrivateChat(user);
    };

    return (
        <>
            <div className="flex flex-col gap-2 mb-4">
                <label>Connector Username</label>
                <div className="bg-gray-50 rounded-lg flex gap-2 p-1">
                    <input
                        type="text"
                        className="grow bg-transparent focus:ring-transparent px-4 py-2"
                        placeholder="Username"
                        ref={tmpForm}
                    ></input>
                    <button
                        onClick={search}
                        className="p-2 text-gray-400 hover:text-gray-700"
                    >
                        {SearchIcon()}
                    </button>
                </div>
            </div>
            {isSearchFound && !!foundProfile && (
                <ConnectorCard info={foundProfile} addAction={addConnector} />
            )}
            {
            isSearchFound === false && (<p>User not found</p>)
            }
        </>
    );
}

const SearchIcon = () => (
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
    </svg>
);

export default PrivatePanel;
