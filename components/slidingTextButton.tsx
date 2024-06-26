import { useEffect, useRef, useState } from 'react'

interface CustomCSSProperties extends React.CSSProperties {
    '--translateXPercent'?: string
}

interface SlidingTextButtonProps {
    onClick?: () => void
    children?: React.ReactNode
}

export function SlidingTextButton({ onClick, children }: Readonly<SlidingTextButtonProps>) {
    const [hover, setHover] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const [translateXPercent, setTranslateXPercent] = useState('0')
    const textRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const textElement = textRef.current
        const containerElement = containerRef.current

        const checkOverflow = () => {
            if (textElement && containerElement) {
                const isOverflow = textElement.scrollWidth > containerElement.clientWidth
                setIsOverflowing(isOverflow)

                if (isOverflow) {
                    const translatePercent = (textElement.scrollWidth / containerElement.clientWidth) * 100
                    setTranslateXPercent(`${translatePercent}`)
                }
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
        <div ref={containerRef} className='relative overflow-hidden w-full justify-start rounded-sm hover:bg-slate-100 px-4' onClick={onClick}>
            <div
                ref={textRef}
                className={`flex flex-row whitespace-nowrap py-2 text-sm font-medium transform ${hover ? 'animate-slide' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={
                    {
                        '--translateXPercent': hover ? `${translateXPercent}%` : '0%'
                    } as CustomCSSProperties
                }
            >
                {children}
            </div>
        </div>
    )
}
