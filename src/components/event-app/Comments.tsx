import { useState } from 'react'
import { Comment } from '../../interface/commentTypes'

// mock data for testing
export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: 'Sounds great, I will be there!', author: 'Jo Blogs' },
    {
      id: 2,
      text: 'Great idea, I can provide transport if needed',
      author: 'Jane Doe',
    },
  ])
  const [newComment, setNewComment] = useState<string>('')

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData: Comment = {
        id: comments.length + 1,
        text: newComment,
        author: 'Current User',
      }
      setComments([...comments, newCommentData])
      setNewComment('')
    }
  }
  return (
    <div className="p-10 md:max-w-xl bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="mb-6 space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-800 mb-2">{comment.text}</p>
            <p className="text-sm text-gray-500">- {comment.author}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a comment"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="w-full bg-[#009277] text-white px-4 py-2 rounded-lg hover:bg-[#009229] focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  )
}
