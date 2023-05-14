import React, { useReducer } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { INITIAL_STATE, postReducer } from './postReducer'
import ACTION_TYPES from './postActionTypes'

const Post = () => {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24
      }}
      spin
    />
  )

  const handleFetch = () => {
    dispatch({ type: ACTION_TYPES.FETCH_START })

    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data })
      })
      .catch((err) => {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR })
        console.log('error', err)
      })
  }

  return (
    <div>
      <button type="button" onClick={handleFetch}>
        {state.loading ? <Spin indicator={antIcon} /> : 'Fetch the post'}
      </button>
      <p>{state.post?.title}</p>
      <span>{state.error && 'Something went wrong!'}</span>
    </div>
  )
}

export default Post
