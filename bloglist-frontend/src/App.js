import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  const [refreshBlogs, setRefreshBlogs] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [refreshBlogs]) //will render everytime state of refresh changes, meaning the blogs will refresh everytime a new one is added, since state of refreshblogs changes then


  const handleDelete = async (blogObject) => {
    if (window.confirm(`do you want to delete '${blogObject.title} by ${blogObject.author}'?`)) {
      await blogService
        .remove(blogObject.id)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))
    }
  }
  const updateLikes = async (id, blogObject) => {
    const updatedBlog = await blogService
      .update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    setRefreshBlogs(!refreshBlogs) //to update view, so user is visible
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService
      .create(blogObject)
    setBlogs(blogs.concat(blog))
    setRefreshBlogs(!refreshBlogs)    
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes) //sorted blogs

  return (
    <div>



      <div>
        <h2>blogs</h2>
        <h2>create new</h2>
        {blogForm()}
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} handleDelete={handleDelete}/>

        )}
      </div>


    </div>)
}

export default App