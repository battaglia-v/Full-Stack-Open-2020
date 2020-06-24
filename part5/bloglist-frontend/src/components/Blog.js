/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, user, onLikeClick, onDeleteClick }) => {
  const [text, setText] = useState('view')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleVisibility = () => {
    setVisible(!visible)
    text === 'view' ? setText('hide') : setText('view')
  }
  const handleLikes = (e) => {
    e.preventDefault()
    onLikeClick({
      ...blog,
      user: blog.id,
      likes: ++blog.likes
    })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    const confirmation = window.confirm(`Are you sure you want to delete the blog ${blog.title}?`)
    if (confirmation) {
      onDeleteClick(blog.id)
    }
    console.log(blog)
  }

  return (
    <div style={blogStyle} className="title-and-author">
      {blog.title} {blog.author}

      <div style={hideWhenVisible}>
        <button onClick={handleVisibility}>{text}</button>
      </div>

      <div style={showWhenVisible} className="expanded-info">
        <p>
          {blog.url}
        </p>
        <p className='likes'>
          {blog.likes} likes <button value={blog.likes} onClick={handleLikes}>like</button>
        </p>
        <p>
          {blog.user && blog.user.name}
        </p>
        {user.name === (blog.user && blog.user.name) ? (
          <button onClick={handleDelete}>
      delete
          </button>
        ) : null }
      </div>


    </div>
  )}

export default Blog
