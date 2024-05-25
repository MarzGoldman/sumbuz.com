// utils/api.ts

const api = async (query: string) => await fetch (new URL(`https://hacker-news.firebaseio.com/v0/${query}`));

export const fetchTopStories = async () => {
    const response = await api('topstories.json');
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const storyIds = await response.json();
    const stories = await Promise.all(
        storyIds.slice(0, 50).map(async (id: number) => { // Fetch the top 5 stories for brevity
            const itemResponse = await api(`item/${id}.json`);
            if (!itemResponse.ok) {
                throw new Error(`${itemResponse.status} ${itemResponse.statusText}`);
            }
            return await itemResponse.json();
        })
    );
    return stories;
};
