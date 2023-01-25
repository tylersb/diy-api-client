import { useState } from 'react'
import axios from 'axios'

export default function Post(props) {
  const [form, setForm] = useState({
    title: props.post.title,
    content: props.post.content
  })

  const handleUpdate = async (id, form) => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`, form)
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/blog`
      )
      props.setPosts(response.data)
      props.handleFormClick('')
    } catch (err) {
      console.warn(err)
    }
  }

  const posts = props.editing ? (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleUpdate(props.post._id, form)
        }}
      >
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <br />
        <input
          type="text"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <br />
        <button>Submit</button>
        <button
          onClick={(e) => {
            e.preventDefault()
            props.handleFormClick('')
          }}
        >
          Cancel
        </button>
      </form>
    </>
  ) : (
    <>
      <h3>{props.post.title}</h3>
      <p>{props.post.content}</p>
      <button onClick={() => props.handleFormClick(props.post._id)}>
        Edit
      </button>
    </>
  )

  return <div>{posts}</div>
}
