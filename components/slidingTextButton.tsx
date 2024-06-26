import { useEffect, useRef, useState } from 'react'

interface SlidingTextButtonProps {
    text: string
    onClick?: () => void
}

export function SlidingTextButton({
    text,
    onClick,
}: Readonly<SlidingTextButtonProps>) {
    const [hover, setHover] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const textRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const textElement = textRef.current
        const containerElement = containerRef.current

        const checkOverflow = () => {
            if (textElement && containerElement) {
                setIsOverflowing(
                    textElement.scrollWidth > containerElement.clientWidth
                )
            }
        }

        checkOverflow()

        window.addEventListener('resize', checkOverflow)
        return () => window.removeEventListener('resize', checkOverflow)
    }, [])

    const handleMouseEnter = () => {
        if (isOverflowing) {
            setHover(true)
        }
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    return (
        <div
            ref={containerRef}
            className='relative overflow-hidden w-full justify-start rounded-sm hover:bg-slate-100'
            onClick={onClick}
        >
            <div
                ref={textRef}
                className={`whitespace-nowrap hover:animate-slide py-2 px-1 text-sm font-medium transform ${
                    hover ? 'animate-slide' : ''
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    animationPlayState: hover ? 'running' : 'paused',
                }}
            >
                {text}
            </div>
        </div>
    )
}
