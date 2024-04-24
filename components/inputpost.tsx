"use client";
import React, { useState } from 'react';
import { Input } from "./ui/input";
import { TextArea } from "./ui/textarea";
import { Button } from "./ui/button";

export function InputPost() {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        console.log(fullname, email, message)

        const res = await fetch("api/posts", {
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
                <Input onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                type='text' id='fullname' placeholder='your name' />
            
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <Input onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email' id='email' placeholder='your mail'
                />



                
            </div>

            <div>
                <label htmlFor="message">Message</label>
                <TextArea onChange={(e) => setMessage(e.target.value)}
                value={message}
                id='message' placeholder='your message here' />
                


                
            </div>

            <Button type='submit'>Send</Button>

            <div>Error</div>
            
        </form>
        </>
    );
}
