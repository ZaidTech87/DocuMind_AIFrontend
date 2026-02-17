import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password) {
            alert("Please fill all fields");
            return;
        }

        if (form.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            await api.post('/auth/register', form);

            alert("Registration successful! Please login.");
            navigate('/login');

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Registration failed. Username or Email might be taken."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-96 bg-white p-8 rounded shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Create Account
                </h2>

                <label className="block text-sm font-medium mb-1">
                    Username
                </label>
                <input
                    className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                    type="text"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={e =>
                        setForm({ ...form, username: e.target.value })
                    }
                />

                <label className="block text-sm font-medium mb-1">
                    Email
                </label>
                <input
                    className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <label className="block text-sm font-medium mb-1">
                    Password
                </label>
                <input
                    className="w-full border p-2 mb-6 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-blue-500 font-bold ml-1"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
