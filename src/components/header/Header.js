
import './Header.css'
import { selectSearchTerm, setSearchTerm } from '../../features/posts/postsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

function Header(props) {

    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const userInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(input));
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleMenuButtonClick = (e) => {
        props.setSubredditsDisplay(!(props.subredditsDisplay));
        //console.log(props.subredditsDisplay)
    }

    useEffect(() => {
        userInput.current.value = searchTerm;
    }, [searchTerm])

    return (
        <>
            <div className='logo-container'>
                <img className='logo-img' src='reddit.png' alt='reddit-logo' />
                <span className='app-title'>RedditMinimal</span>
                <i onClick = {handleMenuButtonClick} className="fa-solid fa-bars menu-button"></i>
            </div>
            
            <div className='search-container'>
                <form className='search-form' onSubmit={handleSubmit}>
                    <input ref={userInput} id='search-input' className='search-input' type='text' placeholder='Search' onChange={handleInputChange} />
                    <button className='search-button' type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
        </>
    )
}

export default Header;