// components/HackerNews.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { fetchTopStories } from '../utils/api_hacker_news';

interface Story {
    id: number;
    title: string;
    url: string;
}

const HackerNews = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStories = async () => {
            try {
                const stories = await fetchTopStories();
                setStories(stories);
            } catch (error: any) {
                setError(error.message);
            }
        };
        loadStories();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="mb-3 text-2xl font-semibold">Hacker News</h2>
            {stories.map((story) => (
                <div key={story.id} className="mb-4">
                    <a href={story.url} target="_blank" rel="noopener noreferrer">
                        {story.title}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default HackerNews;
