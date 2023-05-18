import React, {useEffect, useRef, useState} from 'react'
import "./items.css";
import GetItems from '../Items/getItems'
import axios from 'axios';

const deleteItem = () => {
    const inputRef = useRef(null)
    const {allProducts} = GetItems()
    const [text, setText] = useState('')
    const [id, setId] = useState('') //store the selected product ID
    const [title, setTitle] = useState('') //store selected product Name
    const [image, setImage] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if(id) {
            setIsVisible(true)
            setText(
            <div className='flex'>
                <span className='flex-bg' style={{ color: 'black' }}>{title}</span>
                <span style={{ color: 'white' }}> with ID: </span>
                <span className='flex-bg' style={{ color: 'black' }}>{id}</span>
                <span style={{ color: 'white' }}>will be <span style={{ color: 'red' }}>DELETED</span>. This action cannot be undone.</span>
            </div>
            )
        } else {
            setText(<span style={{ color: 'white' }}>Select the item you'd like to delete</span>)
        }
    }, [id, title])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsVisible(false)
        if(!id) {
            (setText(<span style={{ color: 'red' }}>Please select an item to delete</span>), image)
        }
        else {
           await axios.delete(`/items/${id}`)
           setText(
            <div>
                <span className='flex-bg' style={{ color: 'black' }}>{title}</span> has been deleted. Page will reload in 1s.
            </div>
           )
           setTimeout(() => {
            window.location.reload()
           }, 1000);
        }
    }

    const handleChange = (e) => {
        const splitValue = e.target.value.split('|')
        setId(splitValue[0])
        setImage(splitValue[1])
        setTitle(splitValue[2])
        //setId(e.target.value)
        //setTitle(e.target.options[e.target.selectedIndex].text) // Gets the Text content of the option
    }

    const handleInputSubmit = () => {
        inputRef.current.click()
    }

    return (
    <div className="manage-item">
        <h1>Delete Item</h1>
        <div className="manage-item_content">
            <form onSubmit={handleSubmit}>
                <select defaultValue='' onChange={handleChange}>
                    <option value='' disabled >Select...</option>
                    {allProducts.map(item => (
                    <option key={item._id} value={
                        `${item._id}|${item.image}|${item.title}`
                    }>{item.title}</option>
                    ))}
                </select>
                <input style={{display: 'none'}} type="submit" value='Delete' ref={inputRef} />
            </form>
            <div className='success'>
                <div style={{padding: '1rem'}}>{text}</div>
                <div className={isVisible ? 'visible' : 'notvisible'}>
                    <input onClick={handleInputSubmit} type="submit" value='Delete' />  
                    <img src={image} alt={title} style={{borderRadius: '50%'}} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default deleteItem