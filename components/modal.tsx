import React, { useRef, useEffect } from 'react'

interface ModalProps {
    children: React.ReactNode
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    className?: string
}

export default function Modal({ children, visible, setVisible, className }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setVisible(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setVisible])

    if (!visible) return null

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center'>
            <div ref={modalRef} className={`bg-white p-4 rounded-md mt-10 ${className}`}>
                {children}
            </div>
        </div>
    )
}
