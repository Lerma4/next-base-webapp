'use client'
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [data, setData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });

    const registerUser = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        })

        const userInfo = await response.json();
        console.log(userInfo)
        router.push('/login')
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <form onSubmit={registerUser}>
                        <div className="card-body">
                            <h2 className="card-title">Registrati</h2>
                            <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required
                                type="text" placeholder="Nome" className="input input-bordered w-full max-w-xs" />
                            <input value={data.surname} onChange={(e) => setData({ ...data, surname: e.target.value })} required
                                type="text" placeholder="Cognome" className="input input-bordered w-full max-w-xs" />
                            <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required
                                type="text" placeholder="E-mail" className="input input-bordered w-full max-w-xs" />
                            <input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required
                                type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary btn-block" type='submit'>Registrati</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
