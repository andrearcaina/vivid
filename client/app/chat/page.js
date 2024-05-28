'use client';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDarkMode } from '../../hooks/useDarkModeContext';
import { convertTimestamp } from '@/utils/helpers';
import { UnAuthorized, Deactivated } from '../../components';
import { joinWebSocket, listenSocket, fetchChatHistory, sendMessage } from '@/utils/socket';

export default function Chat() {
    const { role, authReady, activated } = useAuthContext();
    const { darkMode } = useDarkMode();
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        if (authReady) {
            fetchMessages();

            const ws = joinWebSocket("club");
            setSocket(ws);

            ws.onmessage = listenSocket(setMessage);

            return () => {
                ws.close();
            };
        }
    }, [authReady]);

    const fetchMessages = async () => {
        try {
            const chatHistory = await fetchChatHistory("club");

            if (chatHistory && chatHistory.messages) {
                setMessage(chatHistory.messages);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const timestamp = new Date().toISOString();
        sendMessage(socket, message, "", timestamp);
        e.target.reset();
    };

    if (authReady && activated) {
        return (
            <main className={darkMode ? 'dark' : ''}>
                <div className="h-[92.5vh] flex flex-col items-center dark:bg-gray-900">
                    <div className="flex-grow overflow-y-scroll border border-gray-300 dark:border-w rounded-md p-2 mt-[5rem] mb-[3rem] w-3/4">
                        <div className="flex flex-col-reverse">
                            {[...message]?.reverse().map((msg, index) => (
                                <div key={index} className="flex flex-col">
                                    <p className="text-gray-500 dark:text-neutral-300 justify-end mb-1">{convertTimestamp(msg.timestamp)}</p>
                                    <p className="text-black dark:text-neutral-300 justify-end mb-3">{msg.first_name} {msg.last_name}: {msg.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleMessageSubmit} className="flex mb-[5rem] flex-row w-3/4 dark:bg-gray-900">
                        <input
                            type="text"
                            name="message"
                            className="border border-gray-300 dark:text-neutral-300 dark:bg-gray-900 dark:border-white rounded-md p-2 mb-2 flex-grow w-[100%]"
                            required
                        />

                        <button type="submit" className="bg-blue-500 dark:bg-blue-900 dark:text-neutral-300 text-white py-2 px-4 rounded-md ml-2">
                            Send
                        </button>
                    </form>
                </div>
            </main>
        );
    } else if (role === 'member' && !activated) {
        return <Deactivated />;
    } else {
        return <UnAuthorized />;
    }
} 