import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Notification from './components/Notification'
import ChangeUsernameForm from './components/ChangeUsernameForm'
import readingList from './services/readingList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [regUsername, setRegUsername] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regName, setRegName] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const [refreshBlogs, setRefreshBlogs] = useState(false)
  const [userReadingList, setUserReadingList] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [refreshBlogs]) //will render everytime state of refresh changes, meaning the blogs will refresh everytime a new one is added, since state of refreshblogs changes then


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      readingList.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      userService.getById(user.id).then(userData => {
        setUserReadingList(userData.readings || [])
      })
    }
  }, [user, refreshBlogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: loginUsername, password: loginPassword,
      })
      blogService.setToken(user.token)
      readingList.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setLoginUsername('')
      setLoginPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleUserCreation = async (event) => {
    event.preventDefault()
    if (!regName.trim()) {
      setNotification('Failed to create user. Name cannot be empty')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    }
    try {
      await userService.create({ username: regUsername, name: regName, password: regPassword })
      //autologin
      const user = await loginService.login({ username: regUsername, password: regPassword })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setNotification(`User '${regUsername}' created successfully and logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setRegUsername('')
      setRegPassword('')
      setRegName('')
    } catch (exception) {
      let errorMessage = exception.response?.data?.error?.message || exception.response?.data?.error || 'Failed to create user - username may already exist'
      if (typeof errorMessage !== 'string') {
        errorMessage = JSON.stringify(errorMessage.errors[0].message)
      }
      setNotification(errorMessage)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = async (blogObject) => {
    if (window.confirm(`do you want to delete '${blogObject.title} by ${blogObject.author}'?`)) {
      try {
        await blogService
          .remove(blogObject.id)
        setBlogs(blogs.filter(b => b.id !== blogObject.id))
        setNotification(`Blog '${blogObject.title}' deleted successfully`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (exception) {
        let errorMessage = exception.response?.data?.error || 'Failed to delete blog'
        setNotification(errorMessage)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleUsernameChange = async (event) => {
    event.preventDefault()
    try {
      await userService.update(user.username, { ...user, username })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify({ ...user, username }))
      setUser({ ...user, username })
      setNotification(`Username changed to '${username}'`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUsername('')
    } catch (exception) {
      let errorMessage = exception.response?.data?.error?.message || exception.response?.data?.error || 'Failed to change username'
      if (typeof errorMessage !== 'string') {
        errorMessage = JSON.stringify(errorMessage.errors[0].message)
      }
      setNotification(errorMessage)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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

  const addToReadingList = async (blogId) => {
    await readingList.create({ blogId })
    // Refresh reading list
    const userData = await userService.getById(user.id)
    setUserReadingList(userData.readings || [])
    setNotification('Blog added to reading list')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes) //sorted blogs

  return (
    <div>
      <Notification message={notification} />
      {!user && //if no user is logged in:render this
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            username={loginUsername}
            password={loginPassword}
            handleUsernameChange={({ target }) => setLoginUsername(target.value)}
            handlePasswordChange={({ target }) => setLoginPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <h2>Or register user</h2>
          <RegisterForm username={regUsername} password={regPassword} name={regName}
            handleNameChange={({ target }) => setRegName(target.value)}
            handleUsernameChange={({ target }) => setRegUsername(target.value)}
            handlePasswordChange={({ target }) => setRegPassword(target.value)}
            handleSubmit={handleUserCreation}
          />
        </div>
      }


      {user && //if a user is logged in, render this
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in  {logoutButton()}</p>
          <div>
            <ChangeUsernameForm username={username}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handleSubmit={handleUsernameChange}/>
          </div>
          <h2>create new</h2>
          {blogForm()}
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} handleDelete={handleDelete} addToReadingList={addToReadingList} userReadingList={userReadingList} />
          )}
        </div>

      }
    </div>)
}

export default App