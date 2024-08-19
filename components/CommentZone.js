import styles from '../styles/CommentZone.module.css';
import { urlBackend } from '../assets/varGlobal';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';

function CommentZone({ artwork, onClickSend}) {
    const visitor = useSelector((state) => state.user.value.username);
    const [comments, setComments] = useState([]);
    const uploader = artwork.uploader;
    const [newComment, setNewComment] = useState('');
    const commentAreaRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (artwork.comments) {
            setComments(artwork.comments);
        }
    }, [artwork.comments]);

    useEffect(() => {
        if (!visitor) {
            setNewComment('You must be logged in!');
        } else {
            setNewComment('');
        }
    }, [visitor]);

    useEffect(() => {
        if (commentAreaRef.current) {
            commentAreaRef.current.scrollTop = commentAreaRef.current.scrollHeight;
        }
    }, [comments]); // Depend on comments to ensure scrolling happens after comments are updated

    const handleUsernameClick = (username) => {
        router.push(`/user/?username=${username}`);
    };

    const commentsList = comments.map((comment, index) => {
        const username = comment.username;
        const commentText = comment.comment;
        return (
            <div key={index} className={username === uploader ? styles.commentUploader : styles.comment}>
                <div className={styles.commentator} onClick={() => handleUsernameClick(username)}>
                    {username}
                </div>
                <div className={username === uploader ? styles.commentTextUploader : styles.commentText}>{commentText}</div>
            </div>
        );
    });

    const handleSendComment = async () => {
        if (newComment.trim() === '') return;

        try {
            const response = await fetch(`${urlBackend}/artworks/comment/${artwork._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: visitor,
                    comment: newComment,
                }),
            });

            if (response.ok) {
                const updatedArtwork = await response.json();
                // Update the local state with the new comment
                setComments(updatedArtwork.comments);
                setNewComment('');

                // Scroll to the bottom of the comment area
                if (commentAreaRef.current) {
                    commentAreaRef.current.scrollTop = commentAreaRef.current.scrollHeight;
                }
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <div className={styles.commentArea} id={styles.scrollbar1} ref={commentAreaRef}>
                {commentsList}
            </div>
            <div className={styles.newComment}>
                <textarea   maxlength="255"
                    placeholder={visitor ? "Your comment!" : ""}
                    id="yourComment"
                    className={styles.yourComment}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={!visitor || newComment.length >= 255}  /* limit comment size to 255 : moved from send button */
                />
                <span className={styles.characterCount}>{newComment.length}/255</span>
                <button
                    id="send"
                    className={`button ${styles.send}`}
                    onClick= {!visitor ? onClickSend : handleSendComment}     /* was: disabled={!visitor} */
                >
                    Send
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}

export default CommentZone;
