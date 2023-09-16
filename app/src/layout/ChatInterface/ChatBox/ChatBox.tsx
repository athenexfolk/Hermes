import { ChatHistory } from "../../../models/chat-history";
import Message from "../../../components/Message";
import { mockMe } from "../../../mockData";
import { useEffect, useState } from "react";
import { ResponseMessageContext } from "../../../models/message-context";

interface ChatBoxProps {
    data: ChatHistory[];
    sendToChatBox: ResponseMessageContext | null;
}

function ChatBox({ data, sendToChatBox }: ChatBoxProps) {
    const [chatMessages, setChatMessages] = useState(data);

    useEffect(() => {
        if (sendToChatBox) {
            setChatMessages((c) => [
                {
                    chatId: sendToChatBox.chatId,
                    messageId: sendToChatBox.messageId,
                    sender: sendToChatBox.sender,
                    timestamp: sendToChatBox.timestamp,
                    chatContent: sendToChatBox.chatContent,
                } as ChatHistory,
                ...c,
            ]);
        }
    }, [sendToChatBox]);

    useEffect(() => {
        setChatMessages(data);
    }, [data]);

    return (
        <div className="flex items-end relative h-full">
            <div className="flex grow flex-col-reverse gap-4 overflow-y-auto p-4 max-h-full">
                {chatMessages.map((msg) => (
                    <Message
                        key={msg.messageId}
                        isSelf={msg.sender === mockMe._id}
                        msg={msg}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatBox;
