import './Posts.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, selectIsPending, selectHasError, loadPosts } from '../../features/posts/postsSlice.js'
import { selectSelectedSubreddit } from '../../features/subreddits/subredditsSlice.js'
import { useEffect } from 'react';
import Post from '../post/Post.js'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function Posts() {

    const posts = useSelector(selectPosts);
    const isPending = useSelector(selectIsPending);
    const hasError = useSelector(selectHasError);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(loadPosts(selectedSubreddit))
    }, [dispatch, selectedSubreddit])

    if(isPending) {return <Skeleton count={5} height={300} width={'98%'} className='skeleton'/>}
    else if(hasError) return <div className='error-loading-posts-div'>Error loading posts</div>
    return (
        <>
            {
            posts.length === 0? <div className='no-search-matching-div'>No posts matching your search criteria</div> : 
            posts.map(post => (
                <Post key={post.data.id} post={post} />
            ))}
        </>
    )
}

export default Posts;