const loadSubreddits = async () => {
    const response = await fetch('https://www.reddit.com/subreddits.json');
    const jsonResponse = await response.json();
    jsonResponse;
    console.log(jsonResponse.data.children);

}

loadSubreddits()

