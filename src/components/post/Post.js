
import './Post.css'
import { useState, useEffect } from 'react';
import { getEllapsedTime } from '../../utils/getEllapsedTime';
import { handleNumberFormat } from '../../utils/handleNumberFormat';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


function Post(props) {

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsPending, setCommentsPending] = useState(false);
    const [commentsHasError, setCommentsHasError] = useState(false);
    const [currentUserVote, setCurrentUserVote] = useState(0);
    const [postUpVotedClass, setpostUpVotedClass] = useState('');
    const [postDnVotedClass, setpostDnVotedClass] = useState('');
    const [postVotesClass, setPostVotesClass] = useState('');

    const loadImage = () => {
        const imageUrl = props.post.data.url;
        if (imageUrl) {
            return <img key={imageUrl} src={imageUrl} alt='' className='post-img' />
        }
    }

    const handleUpVoteClick = (e) => {
        if (currentUserVote < 1) {
            setCurrentUserVote(1)
        }
        else setCurrentUserVote(0);
    }

    const handleDnVoteClick = (e) => {
        if (currentUserVote > -1) {
            setCurrentUserVote(-1)
        }
        else setCurrentUserVote(0);
    }

    useEffect(() => {

        if (currentUserVote === 1) {
            setpostUpVotedClass('post-upvoted')
            setpostDnVotedClass('')
            setPostVotesClass('post-votes-green')
        } else if (currentUserVote === -1) {
            setpostUpVotedClass('')
            setpostDnVotedClass('post-downvoted')
            setPostVotesClass('post-votes-red')
        } else {
            setpostUpVotedClass('')
            setpostDnVotedClass('')
            setPostVotesClass('')
        }

    }, [currentUserVote]);

    const getComments = async () => {
        setCommentsPending(true);
        setCommentsHasError(false);
        const response = await fetch('https://www.reddit.com' + props.post.data.permalink + '.json');
        if (response.ok) {
            const jsonResponse = await response.json();
            setComments(jsonResponse[1].data.children);
        }else setCommentsHasError(true);
        setCommentsPending(false);
    }

    const handleCommentsButtonClick = async (e) => {
        setShowComments(!showComments);
        getComments();
    }

    const loadComments = () => {
        if (showComments) {
            if (commentsPending) {
                return (
                    <Skeleton count={3} height={50}/>
                )
            }
            else if(commentsHasError){
                return <div className='error-loading-comments-div'>Error loading comments</div>
            }
            return (comments.map(comment => {
                if (comment) {
                    return (
                        <div className='comment-container'>
                            <div className='comment-head'><span className='comment-author'></span>{comment.data.author}  |  <span className='comment-time'>{getEllapsedTime(comment.data.created)} ago</span></div>
                            <div className='comment'>{comment.data.body}</div>
                        </div>
                    )
                } 
                return '';
            }

            ));
        } return '';
    }

    return (
        <>
            <div className='post' id={props.post.data.id}>
                <div className='post-votes-sec'>
                    <div className={'post-upvote ' + postUpVotedClass} onClick={handleUpVoteClick}></div>
                    <div className={'post-votes ' + postVotesClass} >{handleNumberFormat(props.post.data.ups, 'vote')}</div>
                    <div className={'post-downvote ' + postDnVotedClass} onClick={handleDnVoteClick}></div>
                </div>
                <div className='post-details'>
                    <div className='post-head'>
                        <div className='post-author'>Posted by: {props.post.data.author},&nbsp;</div>
                        <div className='post-time'> {getEllapsedTime(props.post.data.created)} ago</div>
                    </div>
                    <div className='post-desc'>{props.post.data.title}</div>
                    <div className='post-img-sec'>
                        {loadImage()}
                    </div>
                    <div className='post-action-bar'>
                        <div className='post-comments-btn' onClick={handleCommentsButtonClick}>
                            <i className="fa-regular fa-message comments-icon"></i>
                            <span className='comments-text'>{handleNumberFormat(props.post.data.num_comments)} comments</span>
                        </div>
                    </div>
                    <div className='post-comments-container'>
                        {loadComments()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post;