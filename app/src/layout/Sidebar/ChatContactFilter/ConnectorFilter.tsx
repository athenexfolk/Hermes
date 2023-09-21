import { useState } from "react";
import { ChatType } from "../../../models/chat";

interface ConnectorFilterProps {
    filterEmitter: (filter: ChatType | null) => void;
}

function ConnectorFilter({ filterEmitter }: ConnectorFilterProps) {
    const [filter, setFilter] = useState<ChatType | null>(null);

    const handleFilter = (newFilter: ChatType | null) => {
        setFilter(newFilter);
        filterEmitter(newFilter);
    };

    return (
        <div className="flex gap-3">
            <button
                className={`px-4 py-2 rounded-full  text-sm font-semibold hover:bg-gray-50 ${
                    filter === null && "bg-blue-100 text-blue-600"
                }`}
                onClick={() => handleFilter(null)}
            >
                All
            </button>
            <button
                className={`px-4 py-2 rounded-full  text-sm font-semibold hover:bg-gray-50 ${
                    filter === ChatType.PRIVATE && "bg-blue-100 text-blue-600"
                }`}
                onClick={() => handleFilter(ChatType.PRIVATE)}
            >
                Private
            </button>
            <button
                className={`px-4 py-2 rounded-full  text-sm font-semibold hover:bg-gray-50 ${
                    filter === ChatType.GROUP && "bg-blue-100 text-blue-600"
                }`}
                onClick={() => handleFilter(ChatType.GROUP)}
            >
                Group
            </button>
        </div>
    );
}

export default ConnectorFilter;
