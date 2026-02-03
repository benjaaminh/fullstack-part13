
const Blog = ({ blog, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogRemoval = () => {
    handleDelete(blog)
  }
  return(
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author} {blog.url}
        <div><button id='remove-button' onClick={handleBlogRemoval}>remove</button></div>
      </div>
    </div>
  )
}


export default Blog