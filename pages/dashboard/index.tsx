// pages/dashboard/index.tsx
import { useState } from 'react';

export default function Dashboard() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    interval: 'monthly',
    sellerUsername: 'warungketo', // Hardcoded for MVP
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Loading...');

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseInt(form.price),
      }),
    });

    if (res.ok) {
      setForm({ title: '', description: '', price: '', interval: 'monthly', sellerUsername: 'warungke
