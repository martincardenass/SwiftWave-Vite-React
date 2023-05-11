import React, { useState, useRef  } from "react"
import "./items.css"
import axios from "axios" //Para hacer solicitudes HTTP desde app web
import { TbPhotoEdit } from "react-icons/tb"
import { useEffect } from "react";

const createItem = () => {
  const fileInputRef =useRef(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('') // initializing as an empty string
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);

    !title || !price || !description || !image
    ? setText('Please complete all fields')
    : (await axios.post('/additem', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }), setText('Data added!'))
  }

  const handleImgSubmit = () => {
    fileInputRef.current.click()
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    setImageUrl(URL.createObjectURL(file))
    setImage(file)
  }

  return (
    <>
      <div className="manage-item">
        <h1>Add a new item</h1>
        <form onSubmit={handleSubmit}>
          <div className="manage-item_content">
            <input
              type="file"
              name="image"
              style={{display: 'none'}}
              ref={fileInputRef}
              onChange={handleImageSelect}
            />
          </div>
          <div className="manage-item_content">
            <input
              type="text"
              value={title}
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="manage-item_content">
            <input
              type="number"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="manage-item_content">
            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <input type="submit" value='Create Item'/>
          <p className='success'>{text}</p>
        </form>
        <div className="success create-item">
          <div className='clicked' onClick={handleImgSubmit} style={{cursor: 'pointer', position: 'relative', display: 'flex'}}>
            <img src={imageUrl} alt='' style={{}} />
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <TbPhotoEdit size='4rem' color="white"  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createItem;
