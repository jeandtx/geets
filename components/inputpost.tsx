"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "./ui/input";
import { TextArea } from "./ui/textarea";
import { Button } from "./ui/button";

export function InputPost() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {  // Type assertion for event.target
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded]);

    const handleFullnameFocus = () => {
        setIsExpanded(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log(fullname, email, message);

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

        const data = await res.json();
        if (data.error) {
            console.log(data.msg);
        } else {
            console.log('Submission successful');
        }
    };

    return (
        <>
        <div className="border-2 p-5 rounded-3xl border-black">
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div>
                <label htmlFor="fullname">Full Name</label>
                <Input 
                    onFocus={handleFullnameFocus}
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                    type='text' 
                    id='fullname' 
                    placeholder='your name' 
                />
            </div>

            {isExpanded && (
                <>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email' 
                            id='email' 
                            placeholder='your mail'
                        />
                    </div>

                    <div>
                        <label htmlFor="message">Message</label>
                        <TextArea 
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            id='message' 
                            placeholder='your message here' 
                        />
                    </div>

                    <Button type='submit'>Send</Button>
                </>
            )}
        </form>
        </div>
        </>
    );
}
