"use client"
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfiniteScroll } from "@/components/infinitescroll";


interface UpperbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UpperBar = ({ className }: UpperbarProps) => {

const [selectedTab, setSelectedTab] = useState('Feeds');

const handleTabClick = (tabName : string) => {
    setSelectedTab(tabName);
};

return (
    <div className="flex flex-col bg-gray-200 p-4">
        <Tabs defaultValue="feed">
            <div className="mx-auto flex flex-row justify-between items-center" style={{ width: '30vw' }}>
                <h1 className="text-2xl font-bold">{selectedTab}</h1>
                <TabsList className="py-10">
                    <TabsTrigger value="feed" onClick={() => handleTabClick('Feed')}>Feed</TabsTrigger>
                    <TabsTrigger value="recent" onClick={() => handleTabClick('Recents')}>Recent</TabsTrigger>
                    <TabsTrigger value="project" onClick={() => handleTabClick('My project')}>My project</TabsTrigger>
                </TabsList>
            </div>
            <div className="border" style={{ width: '60vw' }}>
                <TabsContent value="feed"><InfiniteScroll/></TabsContent>
                <TabsContent value="recent">Recent.</TabsContent>
                <TabsContent value="project">My project are</TabsContent>
            </div>
        </Tabs>
    </div>
);
};