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
    const [selectedTab, setSelectedTab] = useState('Feed')

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName)
    }

    return (
        <div className='flex flex-col items-center'>
            <Tabs defaultValue='feed'>
                <div className='mx-auto flex flex-col md:flex-row justify-between items-center'>
                    <TabsList className='py-5'>
                        <TabsTrigger
                            value='feed'
                            onClick={() => handleTabClick('Feed')}
                        >
                            Feed
                        </TabsTrigger>
                        <TabsTrigger
                            value='recommandation'
                            onClick={() => handleTabClick('Pour vous')}
                        >
                            Pour vous
                        </TabsTrigger>
                        <TabsTrigger
                            value='friends'
                            onClick={() => handleTabClick('Abonnements')}
                        >
                            Abonnements
                        </TabsTrigger>
                    </TabsList>
                </div>
                <div className='w-full' style={{ width: '40vw' }}>
                    <TabContent value='feed'>
                        <InputPost />
                        <InfiniteScroll fetchFunction={getPosts} />
                    </TabContent>
                    <TabContent value='recommandation'>
                        <InputPost />
                        <InfiniteScroll fetchFunction={getPosts} />
                    </TabContent>
                    <TabContent value='friends'>
                        <InputPost />
                        <InfiniteScroll fetchFunction={getPosts} />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}
