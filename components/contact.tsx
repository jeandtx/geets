"use client";
import React, { useState } from 'react';
import { Input } from "./ui/input";

export function Contact() {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(fullname, email, message)

        const res = await fetch("api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname,
                email,
                message
            }),
        });

        const {msg} = await res.json();
        setError(msg);
        console.log(error)

    };


    return (
        <>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div>
                <label htmlFor="fullname">Full Name</label>
                <input onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                type='text' id='fullname' placeholder='john' /> 
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email' id='email' placeholder='john@mail.com'/>
            </div>

            <div>
                <label htmlFor="message">Message</label>
                <textarea onChange={(e) => setMessage(e.target.value)}
                value={message}
                id='message' placeholder='your message here'></textarea>
            </div>

            <button type='submit'>Send</button>

            <div>Error</div>
            
        </form>
        </>
    );
}
