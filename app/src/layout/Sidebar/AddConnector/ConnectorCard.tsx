import { User } from "../../../models/user";

interface ConnectorCardProps {
    info: User
    addAction: (user: User) => void;
}

function ConnectorCard({info, addAction}: ConnectorCardProps) {

    const action = () => {
        addAction(info);
    }

    return (
        <div className="p-4 flex items-center gap-4 border border-gray-100 rounded-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-full object-cover overflow-hidden shrink-0 grow-0 relative">
                <img src={info.avatar} className="w-full"></img>
            </div>
            <div className="grow">{info.displayName}</div>
            <button
                onClick={action}
                className="p-2 rounded-full hover:bg-gray-50 shrink-0 grow-0"
            >
                {AddIcon()}
            </button>
        </div>
    );
}

const AddIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
        />
    </svg>
);

export default ConnectorCard;
