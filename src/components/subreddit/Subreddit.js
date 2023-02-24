import './Subreddit.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedSubreddit, setSelectedSubreddit } from '../../features/subreddits/subredditsSlice';
import { loadPosts } from '../../features/posts/postsSlice.js'
import { setSearchTerm } from '../../features/posts/postsSlice';

function Subreddits(props) {
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    const dispatch = useDispatch();

    const subredditName = props.subreddit.data.display_name;
    const subredditIconUrl = props.subreddit.data.icon_img;

    const handleClick = (e) => {
        dispatch(setSearchTerm(''));
        dispatch(setSelectedSubreddit(subredditName));
        dispatch(loadPosts(subredditName));
    }

    return (
        <>
            <div onClick = {handleClick} className = {selectedSubreddit === subredditName ? 'selected-subreddit subreddit-div':'subreddit-div'}>
                <img className='subreddit-icon' alt='sr-icon' src={subredditIconUrl || './reddit.png'}/>
                <div className= 'subreddit-display-name'>
                    {subredditName}
                </div>
            </div>
        </>
    )
}

export default Subreddits;