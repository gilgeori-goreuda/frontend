import React from 'react';
import close from "../img/close.png";
import "./Modal.css"
const Modal = ({show, onClose, comments, submitComment, newComment, setNewComment}) => {

    console.log(comments)

    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <div className="modal-close-button">
                    <img src={close} onClick={onClose} alt="Close"/>
                </div>
                <div className="comments-container">
                    {comments.map((comment, idx) => (
                        <div key={idx} className="comment">
                            <img src={comment.profileImageUrl} alt="Profile" className="comment-profile-img"/>
                            <div className="comment-content">
                                <p className="comment-author">{comment.nickname}</p>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="comment-form">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력해보세요."
                    />
                    <button onClick={submitComment}>댓글 달기</button>
                </div>
            </section>
        </div>
    );
};

export default Modal;