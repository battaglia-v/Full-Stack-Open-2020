import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


test('renders only the blog title and author to be displayed on default', () => {
  const blog = {
    title: 'The New Way of Coding',
    author: 'Jenny Blake',
    likes: 25
  }

  const mockUser = {
    username: 'username',
    name: 'Name'
  }

  const component = render(
    <Blog
      blog={blog}
      user={mockUser}
      onBlogDelete={() => {}}
      onLikeClick={() => {}}
    />
  )

  component.debug()

  const titleAndAuthor = (component.container).querySelector('.title-and-author')
  expect(titleAndAuthor).toBeVisible

})


test('renders the blog url and number of likes when view button is clicked' , () => {
  const blog = {
    title: 'The New Way of Coding',
    author: 'Jenny Blake',
    likes: 25,
    url: 'www.google.com',
  }

  const mockUser = {
    username: 'username',
    name: 'Name'
  }

  const component = render(
    <Blog
      blog={blog}
      user={mockUser}
      onBlogDelete={() => {}}
      onLikeClick={() => {}}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container.querySelector('.expanded-info')
  ).toBeDefined()

  console.log(prettyDOM(button))

})

test('if like button is clicked twice, event handler is called twice' , () => {

  const blog = {
    title: 'The New Way of Coding',
    author: 'Jenny Blake',
    likes: 25
  }

  const mockHandler = jest.fn()

  const mockUser = {
    username: 'username',
    name: 'Name'
  }

  const component = render(
    <Blog
      blog={blog}
      user={mockUser}
      onBlogDelete={() => {}}
      onLikeClick={mockHandler}
    />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls).toHaveLength(2)
})

