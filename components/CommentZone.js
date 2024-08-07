import styles from '../styles/CommentZone.module.css';
import { useState } from 'react';
import { urlBackend } from '../assets/varGlobal';
import { useSelector } from 'react-redux'


function CommentZone({ artwork }) {
    const owner = useSelector((state) => state.user.value.username)
    const comments = artwork.comments

    console.log(artwork)
    // const commentsList = comments.map((comment, index) => {
    //     const username = Object.keys(comment)[0];
    //     const commentText = comment[username];
    //     return (
    //         <div
    //             key={index}
    //             className={username === owner ? styles.commentOwner : styles.comment}
    //         >
    //             <strong>{username}:</strong> {commentText}
    //         </div>
    //     );
    // });
    // console.log(commentsList)

    return (
        <div >
            <div className={styles.commentArea}>
                {/* {commentElements} */}
            </div>
            <div className={styles.newComment}>
                <textarea placeholder="Your comment!" id="yourComment" className={styles.yourComment} />
                {/* <button id="send" className={`button ${styles.send}`} onClick={()=>send()}>
                    Send
                </button> */}
            </div>
        </div>
    );
}

export default CommentZone;
