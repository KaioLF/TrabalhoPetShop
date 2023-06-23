import React, { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>"</h2>
      <div style={styles.comments}>
        {comments.map((comment, index) => (
          <div key={index} style={styles.comment}>
            {comment}
          </div>
        ))}
      </div>
      <div style={styles.addComment}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Digite um comentário..."
          style={styles.commentInput}
        />
        <button onClick={handleAddComment} style={styles.addButton}>
          Adicionar Comentário
        </button>
      </div>
    </div>
  );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '20px',
        backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  comments: {
    marginBottom: '10px',
  },
  comment: {
    marginBottom: '5px',
    padding: '5px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
  },
  addComment: {
    display: 'flex',
    alignItems: 'center',
  },
  commentInput: {
    flex: '1',
    height: '90px',
    padding: '5px',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CommentSection;
