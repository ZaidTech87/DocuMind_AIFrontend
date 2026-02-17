import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', form);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            alert("Registration failed. Username or Email might be taken.");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 bg-white p-8 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>
                
                <label className="block text-sm font-medium mb-1">Username</label>
                <input className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-blue-400 outline-none" 
                       type="text" placeholder="johndoe" 
                       onChange={e => setForm({...form, username: e.target.value})} required />
                
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-blue-400 outline-none" 
                       type="email" placeholder="john@example.com" 
                       onChange={e => setForm({...form, email: e.target.value})} required />
                
                <label className="block text-sm font-medium mb-1">Password</label>
                <input className="w-full border p-2 mb-6 rounded focus:ring-2 focus:ring-blue-400 outline-none" 
                       type="password" placeholder="••••••••" 
                       onChange={e => setForm({...form, password: e.target.value})} required />
                
                <button className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition">
                    Register
                </button>
                
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500 font-bold">Login</Link>
                </p>
            </form>
        </div>
    );
}