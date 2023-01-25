import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [editPost, setEditPost] = useState('')

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/blog`
        )
        setPosts(response.data)
      } catch (err) {
        console.warn(err)
      }
    }
    fetchBounties()
  }, [])

  const handleFormClick = (e) => {
    setEditPost(e)
  }

  const blogPosts = posts.map((post) => {
    let editing = false
    if (editPost === post._id) {
      editing = true
    }
    return (
      <div key={`post-${post._id}`}>
        <Post post={post} handleFormClick={handleFormClick} editing={editing} setPosts={setPosts}/>
      </div>
    )
  })

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <h2>Blog Posts</h2>
        {blogPosts}
      </div>
    </div>
  )
}
