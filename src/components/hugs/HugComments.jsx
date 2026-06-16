import React, { useState } from 'react';
import './HugComments.css';

const HugComments = ({ comments: initialComments, onClose, creatorName }) => {
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: `c-new-${Date.now()}`,
            user: 'Tú',
            avatar: '😊',
            text: newComment.trim(),
            time: 'Ahora',
        };

        setComments(prev => [comment, ...prev]);
        setNewComment('');
    };

    return (
        <div className="hug-comments-overlay" onClick={onClose}>
            <div className="hug-comments-panel" onClick={e => e.stopPropagation()}>
                <div className="hug-comments-header">
                    <h3>Comentarios <span className="comments-count">({comments.length})</span></h3>
                    <button className="hug-comments-close" onClick={onClose}>✕</button>
                </div>

                <div className="hug-comments-list">
                    {comments.length === 0 ? (
                        <div className="hug-comments-empty">
                            <p>Sé el primero en comentar 💬</p>
                        </div>
                    ) : (
                        comments.map(comment => (
                            <div key={comment.id} className="hug-comment-item">
                                <div className="hug-comment-avatar">{comment.avatar}</div>
                                <div className="hug-comment-body">
                                    <div className="hug-comment-meta">
                                        <span className="hug-comment-user">{comment.user}</span>
                                        <span className="hug-comment-time">{comment.time}</span>
                                    </div>
                                    <p className="hug-comment-text">{comment.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <form className="hug-comments-input-area" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={`Comentar a ${creatorName}...`}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="hug-comments-input"
                    />
                    <button
                        type="submit"
                        className="hug-comments-send"
                        disabled={!newComment.trim()}
                    >
                        ➤
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HugComments;
