import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post('/auth/login', form);

            login(res.data.token);
            navigate('/dashboard');

        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 bg-white p-8 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login to DocuMind
                </h2>

                <input
                    className="w-full border p-2 mb-4 rounded"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />

                <input
                    className="w-full border p-2 mb-4 rounded"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-4 text-center">
                    Don't have an account?
                    <Link to="/register" className="text-blue-500 ml-1">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
