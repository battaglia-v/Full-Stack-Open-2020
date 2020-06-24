import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import CreateNewBlog from './CreateNewBlog'


test.only('<CreateNewBlog /> calls event handler it received as props with the right details', () => {
  const addedBlog = jest.fn()


  const component = render(
    <CreateNewBlog addedBlog={addedBlog} />
  )
  component.debug()

  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const url = component.container.querySelector('.url')
  const form = component.container.querySelector('form')

  console.log(prettyDOM(url))

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })

  fireEvent.change(author, {
    target: { value: 'jessie williams' }
  })

  fireEvent.change(url, {
    target: { value: 'www.uitesting.com' }
  })
  fireEvent.submit(form)

  expect(addedBlog.mock.calls).toHaveLength(1)
  expect(addedBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(addedBlog.mock.calls[0][0].author).toBe('jessie williams')
  expect(addedBlog.mock.calls[0][0].url).toBe('www.uitesting.com')


})
