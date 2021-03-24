import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'NEW_BLOG': {
      return [...state, action.data]
    }
    case 'UPDATE_BLOG': {
      const updatedBlog = action.data
      return state.map(blog => blog.id === updatedBlog.id ? { ...blog, likes: updatedBlog.likes } : blog)
    }
    case 'DELETE_BLOG': {
      const blogToDelete = action.data
      return state.filter(blog => blog.id !== blogToDelete.id)
    }
    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export default blogReducer