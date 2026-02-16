import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [docs, setDocs] = useState([]);
    const [file, setFile] = useState(null);

    const fetchDocs = async () => {
        const res = await api.get('/documents/list');
        setDocs(res.data);
    };

    useEffect(() => { fetchDocs(); }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        await api.post('/documents/upload', formData);
        fetchDocs();
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">My Documents</h1>
            <div className="bg-white p-6 rounded shadow mb-10">
                <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4 block" />
                <button onClick={handleUpload} className="bg-green-600 text-white px-6 py-2 rounded">Upload & Process</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {docs.map(doc => (
                    <div key={doc.id} className="bg-white p-5 rounded shadow hover:shadow-md transition">
                        <h3 className="font-bold truncate">{doc.fileName}</h3>
                        <p className="text-sm text-gray-500 mb-4">{new Date(doc.uploadDate).toLocaleDateString()}</p>
                        <Link to={`/chat/${doc.id}`} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Ask AI</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}