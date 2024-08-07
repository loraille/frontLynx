import styles from '../styles/CommentZone.module.css';
import { urlBackend } from '../assets/varGlobal';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function CommentZone({ artwork }) {
    const visitor = useSelector((state) => state.user.value.username);
    const [comments, setComments] = useState([]);
    const uploader = artwork.uploader;
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (artwork.comments) {
            setComments(artwork.comments);
        }
    }, [artwork.comments]);

    const commentsList = comments.map((comment, index) => {
        const username = comment.username;
        const commentText = comment.comment;
        return (
            <div key={index} className={username === uploader ? styles.commentUploader : styles.comment}>
                <div>{username}</div>
                <div>{commentText}</div>
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
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <div className={styles.commentArea}>
                {commentsList}
            </div>
            <div className={styles.newComment}>
                <textarea
                    placeholder="Your comment!"
                    id="yourComment"
                    className={styles.yourComment}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button id="send" className={`button ${styles.send}`} onClick={handleSendComment}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default CommentZone;
