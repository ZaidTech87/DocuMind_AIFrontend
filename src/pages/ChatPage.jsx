import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function ChatPage() {
    const { docId } = useParams();
    const [chat, setChat] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const askAI = async () => {
        if (!question.trim() || !docId) return;

        setLoading(true);

        const userMsg = { role: 'user', text: question };
        setChat(prev => [...prev, userMsg]);

        try {
            const res = await api.post(`/ai/ask/${docId}`, { question });

            setChat(prev => [
                ...prev,
                { role: 'ai', text: res.data.answer }
            ]);
        } catch (err) {
            setChat(prev => [
                ...prev,
                { role: 'ai', text: "Something went wrong." }
            ]);
        } finally {
            setQuestion("");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-10 h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto bg-white border rounded p-5 mb-5 space-y-4">
                {chat.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-lg max-w-[80%] ${
                            msg.role === 'user'
                                ? 'bg-blue-100 ml-auto'
                                : 'bg-gray-100'
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>

            <div className="flex gap-4">
                <input
                    className="flex-1 border p-3 rounded"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="Type a question about this document..."
                />
                <button
                    onClick={askAI}
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded disabled:opacity-50"
                >
                    {loading ? "Thinking..." : "Send"}
                </button>
            </div>
        </div>
    );
}
