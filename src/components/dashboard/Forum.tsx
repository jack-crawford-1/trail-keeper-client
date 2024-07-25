export default function Forum() {
  const posts = [
    {
      id: 1,
      user_id: 1,
      content: 'This is a post by Alice',
      created_at: '2024-07-13 05:14:54.860092',
    },
    {
      id: 2,
      user_id: 2,
      content: 'This is a post by Bob',
      created_at: '2024-07-13 05:14:54.860092',
    },
  ]

  return (
    <div className="p-4">
      <div className="mb-4 text-center">
        <h2 className="font-bold text-2xl">Forum Posts</h2>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-2 font-semibold text-lg">
        <div className="col-span-2 text-center">User</div>
        <div className="col-span-8 text-center">Content</div>
        <div className="col-span-2 text-center">Created At</div>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="grid grid-cols-12 gap-4 text-sm mb-1 items-center"
        >
          <div className="col-span-2 text-center">{post.user_id}</div>
          <div className="col-span-8 text-center">{post.content}</div>
          <div className="col-span-2 text-center">
            {new Date(post.created_at).toLocaleDateString('en-NZ')}
          </div>
        </div>
      ))}
    </div>
  )
}
