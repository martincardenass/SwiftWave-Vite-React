import React, { useState, useRef  } from "react"
import "./items.css"
import axios from "axios" //Para hacer solicitudes HTTP desde app web
import { TbPhotoEdit } from "react-icons/tb"

const createItem = () => {
  const fileInputRef =useRef(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('') // initializing as an empty string
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);

    !title || !price || !description || !image || !category
    ? setText('Please complete all fields')
    : (await axios.post('/additem', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }), setText(
      <div>
        <span>Successfully submitted: <p>{title}, {price}, {description}, {category}</p></span>
      </div>
    ))
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
          <div className="manage-item_content">
            <select  defaultValue='' name="sortField" id="sortField" onChange={(e) => setCategory(e.target.value)}>
              <option value='' disabled>Select a category</option>
              <option value='Software'>Software</option>
              <option value='PC Parts and Hardware'>PC Parts and Hardware</option>
              <option value='Video Games'>Video Games</option>
              <option value='Cell Phones'>Cell Phones</option>
              <option value='Television and Video'>Television and video</option>
            </select>
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
