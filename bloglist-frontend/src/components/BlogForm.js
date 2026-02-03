import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    if (!title.trim() || !url.trim()) {
      alert('Title and URL are required')
      return
    }
    createBlog ( {
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='write title text here'
          required
        />
      </div>
      <div>
        author:
        <input
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='write author text here'
        />
      </div>
      <div>
        url:
        <input
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='write url text here'
          required
        />
      </div>
      <button id='create-button'type="submit">create</button>
    </form>
  )
}

export default BlogForm