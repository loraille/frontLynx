import styles from '../styles/CommentZone.module.css';
import { useState } from 'react';
import { urlBackend } from '../assets/varGlobal';

function CommentZone({ artwork }) {
    const owner = 'joe';
    const commentsFake = [
        { alice: "I love the colors!" },
        { bob: "Amazing details!" },
        { joe: "Thanks for the feedback!" },
        { charlie: "Beautiful composition!" },
        { alice: "Inspiring work!" },
        { joe: "Appreciate the support!" },
        { bob: "Very creative!" },
        { charlie: "Impressive technique!" },
        { joe: "Thank you all!" },
        { alice: "Stunning piece!" },
        { bob: "Fantastic job!" },
        { joe: "Glad you liked it!" },
        { charlie: "Outstanding!" },
        { alice: "Brilliant work!" },
        { joe: "Thank you so much!" },
        { bob: "Incredible!" },
        { charlie: "Magnificent!" },
        { joe: "Appreciate your kind words!" },
        { alice: "Awesome artwork!" }
    ];
    console.log(artwork)
    const commentElements = commentsFake.map((comment, index) => {
        const username = Object.keys(comment)[0];
        const commentText = comment[username];
        return (
            <div
                key={index}
                className={username === owner ? styles.commentOwner : styles.comment}
            >
                <strong>{username}:</strong> {commentText}
            </div>
        );
    });

    return (
        <div >
            <div className={styles.commentArea}>
                {commentElements}
            </div>
            <div className={styles.newComment}>
                <textarea placeholder="Your comment!" id="yourComment" className={styles.yourComment} />
                <button id="send" className={`button ${styles.send}`}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default CommentZone;
