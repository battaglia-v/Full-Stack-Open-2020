import React, { useState } from 'react'
import { useId } from 'react-id-generator'


const CreateNewBlog = ({ addedBlog }) => {
  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogUrl] = useState('')

  const handleTitleChange = (e) => {
    setBlogTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setBlogAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setBlogUrl(e.target.value)
  }

  const handleCreateNewBlog = e => {
    e.preventDefault()
    addedBlog({
      title,
      author,
      url
    })
    console.log(addedBlog)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const [htmlId] = useId()

  return (
    <div className='blogFormDiv'>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
                title:
        <input
          className='title'
          id={htmlId}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
                author:
        <input
          className='author'
          id={htmlId}
          type="text"
          value={author}
          onChange={handleAuthorChange}
        />
        <br />
                url:
        <input
          className='url'
          id={htmlId}
          type="text"
          value={url}
          onChange={handleUrlChange}
        />
        <br />
        <button id='create' type="submit">create</button>
      </form>
    </div>

  )
}

export default CreateNewBlog