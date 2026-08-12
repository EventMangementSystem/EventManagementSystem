import { useState } from "react";
import aiService from "../../services/aiService";
import "./AIChat.css";
import ReactMarkdown from "react-markdown";

export default function AIChat() {

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await aiService.chat(message);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: response.data,
                },
            ]);

        } catch {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Something went wrong.",
                },
            ]);

        } finally {

            setLoading(false);

            setMessage("");

        }

    };

    return (
        <>

            <button
                className="ai-button"
                onClick={() => setOpen(!open)}
            >
                🤖
            </button>

            {open && (

                <div className="ai-chat">

                    <div className="ai-header">

                        Event AI Assistant

                    </div>

                    <div className="ai-body">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={msg.sender}
                            >
                                <ReactMarkdown>
                                    {msg.text}
                                </ReactMarkdown>
                            </div>

                        ))}

                        {loading && (
                            <div className="ai">
                                Thinking...
                            </div>
                        )}

                    </div>

                    <div className="ai-footer">

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="Ask anything..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    sendMessage();
                            }}
                        />

                        <button onClick={sendMessage}>
                            Send
                        </button>

                    </div>

                </div>

            )}

        </>
    );
}