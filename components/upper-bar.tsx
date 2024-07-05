'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import InfiniteScroll from '@/components/infinitescroll'
import { InputPost } from '@/components/inputpost'
import { getPosts } from '@/lib/data/post'

interface UpperbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabContent = ({
    value,
    children,
}: {
    value: string
    children: React.ReactNode
}) => (
    <TabsContent value={value} className='flex flex-col space-y-4'>
        {children}
    </TabsContent>
)

export const UpperBar = ({ className }: UpperbarProps) => {
    const [selectedTab, setSelectedTab] = useState('recent')

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName)
    }

    return (
        <div className='flex flex-col items-center'>
            <Tabs defaultValue='popular'>
                <div className='mx-auto flex flex-col md:flex-row justify-between items-center'>
                    <TabsList className='py-5 space-x-3'>
                        <TabsTrigger
                            value='popular'
                            onClick={() => handleTabClick('popular')}
                        >
                            Populaires 🔥
                        </TabsTrigger>
                        <TabsTrigger
                            value='recent'
                            onClick={() => handleTabClick('recent')}
                        >
                            Récents ⏳
                        </TabsTrigger>
                        {/* <TabsTrigger
                            value='friends'
                            onClick={() => handleTabClick('Abonnements')}
                        >
                            Abonnements
                        </TabsTrigger> */}
                    </TabsList>
                </div>
                <div className='w-full'>
                    <TabContent value='recent'>
                        <div className='hidden sm:block'>
                        <InputPost />
                        </div>
                        <InfiniteScroll sort='recent' />
                    </TabContent>
                    <TabContent value='popular'>
                    <div className='hidden sm:block'>
                        <InputPost />
                        </div>
                        <InfiniteScroll sort='popular' />
                    </TabContent>
                    {/* <TabContent value='friends'>
                    <div className='hidden sm:block'>
                        <InputPost />
                        </div>
                        <InfiniteScroll fetchFunction={getPosts} />
                    </TabContent> */}
                </div>
            </Tabs>
        </div>
    )
}
