import React, { useState, useEffect, useRef } from 'react'
import "./items.css"
import GetItems from '../Items/getItems'
import axios from 'axios'
import { TbPhotoEdit } from "react-icons/tb"

const updateItem = () => {
    const fileInputRef = useRef(null)
    const inputRef = useRef(null)
    const selectRef = useRef(null)
    const {productsArray, allProducts} = GetItems()
    const [text, setText] = useState('')
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    //Nota: useEffect se usa para ejectura codigo despues de que un componente se haya renderizado. Y se ejecuta despues de cada renderizado del componente. 
    
    const handleImgSubmit = (e) => {
        fileInputRef.current.click()
    }

    const handleInputSubmit = () => {
        inputRef.current.click()
    }

    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        setImage(URL.createObjectURL(file))
        setImageUrl(file)
    }

    useEffect(() => { 
        id
        ? (setText(
            <div className='manage-item'>
                <div className="centerthis">
                <form>
                    <div className="manage-item_content"> 
                        <input
                        type="file"
                        style={{display: 'none'}}
                        name="image"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        />
                    </div> 
                    <div className="manage-item_content">
                        <input
                        type="text"
                        placeholder={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="manage-item_content">
                        <input
                        type="text"
                        placeholder={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="manage-item_content">
                        <input
                        type="text"
                        placeholder={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </form>
                <div>
                    <input onClick={handleInputSubmit} type="submit" value='Update'/>
                    <input onClick={() => (
                    setId(null), setIsVisible(null), selectRef.current.value = ''
                    )} type="submit" value='Cancel'/>
                </div>
                </div>
            </div>
        ), image, setIsVisible(true)
        )
        : setText(<span style={{ color: 'white' }}>Select the item you'd like to update</span>)
    }, [id, title, price, description, image])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!id) {
            setText(<span style={{ color: 'red' }}>Please select an item to update</span>)
        }
        else {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("image", imageUrl);
            await axios.patch(`/items/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            setIsVisible(false)
            setText(
                <div>
                    <span className='flex-bg' style={{ color: 'black' }}>{title}</span> has been updated. Page will reload in 1s.
                </div>
            )
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
    }
    //Nota: en el codigo de abajo, necesitaba obtener el valor de img, una de las maneras en la que pense fue: para no repetir codigo, asignar product.image a 'value' de option. Sin embargo, este ya estaba ocupado con el id, y lo usaba para almacenar su valor en un useState y cambiar el texto con eso
    const handleChange = (e) => {
        const splitValue = e.target.value.split('|') // se usa el metodo ('split') para separar a los elementos, y se le da, entre parentesis, el caracter que usamos para separar dichos elementos (probe con el caracter / y no sirvio)
        setId(splitValue[0])
        setImage(splitValue[1])
        setTitle(splitValue[2])
        setPrice(splitValue[3])
        setDescription(splitValue[4])
        //setTitle(e.target.options[e.target.selectedIndex].text) Manera que, en principio, use para obtener el valor de product.title, obtenia el texto (el contenido, lo que se mostraba) en las opciones. No me parecio una manera optima, ya que este metodo me limitaba a solo poder acceder a dos elementos de la base de datos: id y titulo, ¿y si necesitaba alguno más? 
    }
    //asignar todos los valores que necesito de la base de datos al 'value' de cada opcion funciono, despues, se separan y se accede a cada posicion[#] del array. Como se muestra arriba.
    return (
    <div className="manage-item">
        <h1>Update Item</h1>
        <div className="manage-item_content">
            <form onSubmit={handleSubmit}>
                <select ref={selectRef} defaultValue='' onChange={handleChange}>
                    <option value='' disabled>Select...</option>
                    {allProducts.map(product => (
                        <option key={product._id} value={
                            `${product._id}|${product.image}|${product.title}|${product.price}|${product.description}` // asignandole a esta opcion todos estos valores, separados con un | para su facil acceso
                        }>{product.title}</option>
                    ))}
                </select>
                <input style={{display: 'none'}} type="submit" value='Update' ref={inputRef}/>
            </form>
            <div className="success">
                <div style={{padding: '1rem'}}>{text}</div>
                <div onClick={handleImgSubmit} style={{cursor: 'pointer', position: 'relative'}}>
                    <div style={{width: '100%', height: '100%', borderRadius: '50%', position: 'absolute', background: 'black', opacity: 0.5,  top: '0%', left: '0%'}}></div>
                    {/**/}
                    <div className={isVisible ? 'visible' : 'notvisible'}>
                        <img src={image} alt={title} style={{borderRadius: '50%'}} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <TbPhotoEdit size='3rem' />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default updateItem