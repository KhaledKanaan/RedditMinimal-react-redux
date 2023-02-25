const baseUrl = 'https://www.reddit.com/';

export const getSubredditPosts = async (subreddit) => {
    const response = await fetch(`${baseUrl}r/${subreddit}.json`);
    const jsonResponse = await response.json();
    return jsonResponse.data.children;  
}

export const getSubreddits= async () => {
    const response = await fetch(`${baseUrl}subreddits.json`);
        const jsonResponse = await response.json();
        return jsonResponse.data.children;  
}