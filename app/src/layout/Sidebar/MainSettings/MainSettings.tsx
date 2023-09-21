import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth-service";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

interface MainSettingsProps {
    openStatus: boolean;
    emitCloseEvent: () => void;
}

function MainSettings({ openStatus, emitCloseEvent }: MainSettingsProps) {

    const myContext = useContext(AuthContext);
    const navigate = useNavigate();

    const myInfo = myContext.user;
    const closeMainSettings = () => {
        emitCloseEvent();
    };

    const handleLogout = () => {
        logout().then(() => navigate("/login"));
    };

    return (
        <div
            className={` ${
                openStatus
                    ? "w-full visible left-0"
                    : "w-0 invisible -left-full"
            } h-full bg-white top-0 absolute min-h-0 transition-all ease-in-out p-4 duration-500`}
        >
            <div className="flex flex-col gap-3">
                <button
                    onClick={closeMainSettings}
                    className="p-3 hover:bg-gray-100 rounded-full self-start"
                >
                    {XMarkIcon()}
                </button>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full self-center overflow-hidden">
                        <img src={myInfo?.avatar}/>
                    </div>
                    <p className="text-2xl font-bold">{myInfo?.displayName}</p>
                    <p className="text-xs text-gray-500">{myInfo?._id}</p>
                </div>
                <button className="flex items-center gap-4 font-bold p-2 rounded-xl hover:bg-gray-100">
                    <span className="p-2 bg-gray-200 rounded-lg">
                        {UserIcon()}
                    </span>
                    Change name
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 font-bold p-2 rounded-xl hover:bg-gray-100"
                >
                    <span className="p-2 bg-gray-200 rounded-lg">
                        {LogoutIcon()}
                    </span>
                    Logout
                </button>
            </div>
        </div>
    );
}

const XMarkIcon = () => (
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
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
    </svg>
);

const UserIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
        />
    </svg>
);

const LogoutIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
    >
        <path
            d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z"
            fill="currentColor"
        />
        <path
            d="M4.56141 11.2498L6.63141 9.17984C6.78141 9.02984 6.85141 8.83984 6.85141 8.64984C6.85141 8.45984 6.78141 8.25984 6.63141 8.11984C6.34141 7.82984 5.86141 7.82984 5.57141 8.11984L2.22141 11.4698C1.93141 11.7598 1.93141 12.2398 2.22141 12.5298L5.57141 15.8798C5.86141 16.1698 6.34141 16.1698 6.63141 15.8798C6.92141 15.5898 6.92141 15.1098 6.63141 14.8198L4.56141 12.7498H9.00141V11.2498H4.56141Z"
            fill="currentColor"
        />
    </svg>
);

export default MainSettings;
