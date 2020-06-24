import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateNewBlog from './components/CreateNewBlog'
import './App.css'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = React.createRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotificationMessage(`${user.name} is logged in`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2000)
      setUsername('')
      setPassword('')
    } catch (e) {
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2000)
    }
  }

  const handleUpdatedLikes = async onLikeClick => {
    const updatedBlog = await blogService.update(onLikeClick)
    const newBlogs = blogs.map(blog => {
      return blog.id === updatedBlog.id ? updatedBlog: blog
    })
    setBlogs(mostLikes(newBlogs))
    console.log(blogs)
  }

  const mostLikes = blogs => {
    return (blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    )}

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleNewBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNotificationMessage(`the new blog: ${blog.title} by ${blog.author} was added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2000)
    } catch (e) {
      console.log(e.response)
      setNotificationMessage(e.response.data)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2000)
    }
  }

  const handleDeleteBlog = async id => {
    const blog = await blogService.remove(id)
    const removeBlog = blogs.filter(b => b.id !== blog.id)
    setBlogs(removeBlog)
    setNotificationMessage(`the blog: ${blog.title} by ${blog.author} was deleted`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000)
  }


  if (user === null) {
    return (
      <div>
        <Notification
          message={notificationMessage}
        />
        <LoginForm
          setUsername={setUsername}
          handleLogin={handleLogin}
          username={username}
          setPassword={setPassword}
          password={password}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notificationMessage}
      />
      <p>{user.name} logged in
        <button
          onClick={handleLogout}
        >logout</button>
      </p>
      <Togglable buttonLabel='new blog post' id='new-blog-post' ref={blogFormRef}>
        <CreateNewBlog
          addedBlog={handleNewBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onLikeClick={handleUpdatedLikes}
          onDeleteClick={handleDeleteBlog}
        />
      )}
    </div>
  )
}


export default App