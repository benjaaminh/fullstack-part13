
const Blog = ({ blog, handleDelete, updateLikes, addToReadingList, userReadingList, markAsRead }) => {

  // Check if this blog is in the user's reading list
  const readingEntry = userReadingList.find(reading => reading.id === blog.id)
  const isInReadingList = !!readingEntry // check if it exists, turns into a boolean
  const isAlreadyRead = readingEntry?.reading_lists?.read || false // if its marked as read

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

  const handleReadingList = () => {
    addToReadingList(blog.id)
  }

  const handleBlogRemoval = () => {
    handleDelete(blog)
  }

  const handleRead = () => {
    if (readingEntry && readingEntry.reading_lists) {
      markAsRead(readingEntry.reading_lists.id)
    }
  }

  return(
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author} {blog.url}
        <div><button id='remove-button' onClick={handleBlogRemoval}>remove</button></div>
        <div>likes {blog.likes} <button id='like-button' onClick={handleLikes}>like </button></div>
        <div>
          <button onClick={handleReadingList} disabled={isInReadingList}>
            {isInReadingList ? 'Already in reading list' : 'add to reading list'}
          </button>
          <button onClick={handleRead} disabled={!isInReadingList || isAlreadyRead}>
            {isAlreadyRead ? 'Already read' : 'mark as read'}
          </button>
        </div>
      </div>
    </div>
  )
}


export default Blog