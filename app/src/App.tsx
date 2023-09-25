import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChatInterface from "./layout/ChatInterface/ChatInterface";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Plain from "./pages/Plain";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { mockContact, mockHistory } from "./mockData";
import { getMyProfile } from "./services/connector-service";
import MainPage from "./pages/MainPage";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
    {
        path: "/",
        loader: () => mockContact,
        element: <MainPage />,
        children: [
            {
                path: "",
                element: <Plain />,
            },
            {
                path: ":chatId",
                loader: ({ params }) => ({
                    contact: mockContact.find(
                        (contact) => contact.chatID === params.chatId
                    ),
                    history: mockHistory.filter(
                        (message) => message.chatId === params.chatId
                    ),
                }),
                element: <ChatInterface />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
]);

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    getMyProfile().then();

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log(isConnected);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [isConnected]);

    return (
        <>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    );
}

export default App;
