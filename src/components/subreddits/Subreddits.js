import './Subreddits.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllSubreddits, selectIsPending, selecthasError, loadSubreddits } from '../../features/subreddits/subredditsSlice.js';
import Subreddit from '../subreddit/Subreddit.js'
import { MoonLoader } from 'react-spinners';


function Subreddits() {

    const dispatch = useDispatch();
    const allSubreddits = useSelector(selectAllSubreddits);
    const isPending = useSelector(selectIsPending);
    const hasError = useSelector(selecthasError);

    useEffect(() => {
        dispatch(loadSubreddits());
    }, [dispatch])

    if (isPending) return <MoonLoader color='rgb(124, 124, 124)' size={30} className='moon-loader'/>
    else if(hasError) return <div className='error-loading-subreddits-div'>Error loading subreddits</div>
    return (
        <>     
            <div className='subreddits-div'>
                {allSubreddits.map(subreddit => (
                    <Subreddit key={subreddit.data.id} subreddit={subreddit} />
                ))}
            </div>
        </>
    )
}

export default Subreddits;