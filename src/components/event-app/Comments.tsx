import { useState, useEffect } from 'react'
import axios from 'axios'
import { Comment } from '../../interface/commentTypes'

export default function Comments({ eventId }: { eventId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>('')

  useEffect(() => {
    if (eventId) {
      axios
        .get(`http://localhost:3000/v1/comments?eventId=${eventId}`)
        .then((response) => {
          setComments(response.data.comments)
        })
        .catch((error) => {
          console.error('Error fetching comments:', error)
        })
    }
  }, [eventId])

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        post_id: eventId,
        user_id: 1,
        content: newComment,
        created_at: new Date().toISOString(),
      }

      axios
        .post('http://localhost:3000/v1/comments', newCommentData)
        .then((response) => {
          setComments([...comments, response.data.comment])
          setNewComment('')
        })
        .catch((error) => {
          console.error('Error adding comment:', error)
        })
    }
  }

  return (
    <div className="p-10 md:max-w-xl bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="mb-6 space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-800 mb-2">{comment.content}</p>
            <p className="text-sm text-gray-500">
              - User ID: {comment.user_id}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none "
          placeholder="Add a comment"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="w-full bg-[#009277] text-white px-4 py-2 rounded-lg hover:bg-slate-700 "
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  )
}
