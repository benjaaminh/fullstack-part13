
const Blog = ({ blog, handleDelete, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const  handleLikes = () => {
    const updatedBlog = {
      likes: Number(blog.likes)+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateLikes(blog.id,updatedBlog)
  }

  const handleBlogRemoval = () => {
    handleDelete(blog)
  }
  return(
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author} {blog.url}
        <div><button id='remove-button' onClick={handleBlogRemoval}>remove</button></div>
        <div>likes {blog.likes} <button id='like-button' onClick={handleLikes}>like </button></div>
      </div>
    </div>
  )
}


export default Blog