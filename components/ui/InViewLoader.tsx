import { InViewHookResponse } from 'react-intersection-observer'
import React from 'react'

interface InViewLoaderProps {
    inView: boolean
    ref: (node?: Element | null | undefined) => void
}

export default function InViewLoader({ inView, ref }: InViewLoaderProps) {
    return (
        <div>
            <div ref={ref}>Loading...</div>
        </div>
    )
}
