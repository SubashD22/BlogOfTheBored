import axios from 'axios';
import React, { useContext, useMemo, useRef, useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import style from './Write.module.css'
import { useUserContext } from '../../Context/UserContext';

function Write() {
    const navigate = useNavigate()
    const { user } = useUserContext()
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    const token = user.token
    const [loading, setloading] = useState(false)
    const [category, setCategory] = useState([])
    const [postData, setPostData] = useState({
        Title: '',
        Image: '',
    })
    const [images, setImages] = useState([])
    const [value, setValue] = useState('');
    useEffect(() => {
        console.log(value)
    }, [value])
    const { Title, Image } = postData
    const mainOnchange = (e, type) => {
        const value = type === 'image' ? e.target.files[0] : e.target.value

        setPostData((prevData) => ({
            ...prevData,
            [e.target.name]: value
        }))
        console.log(Text)
    }

    const publish = async (e) => {
        e.preventDefault();
        setloading(true);
        const formData = new FormData
        for (let key in postData) {
            formData.append(key, postData[key])
        }
        formData.append('Text', value)
        category.forEach(c =>
            formData.append('Categories', c)
        )

        formData.append('Images', images)
            ;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.post('http://localhost:5000/api/newpost', formData, config)
        if (response) {
            navigate(`/post/${response.data}`)
        }
    }
    const quillRef = useRef();
    const imageHandler = (e) => {
        const editor = quillRef.current.getEditor();
        console.log(editor)
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                console.log(file);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET)
                console.log(process.env.REACT_APP_CLOUDINARY_PRESET)
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, formData); // upload data into server or aws or cloudinary
                console.log(res)
                const url = res?.data?.url;
                setImages(p => [...p, res.data.public_id])
                editor.insertEmbed(editor.getSelection(), "image", url);
            } else {
                alert('You could only upload images.');
            }
        };
    }
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', "strike"],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['image', "link",],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
            ],
            handlers: {
                image: imageHandler
            }
        },
    }), [])
    let dis
    if (loading) {
        dis = true
    } else dis = false
    let categoriesArray = ["fashion", "food", "games", "hobby", "movies", "music", "sports", "story", "travel"];
    const addCategory = (e, c) => {
        e.preventDefault()
        if (!category.includes(c)) {
            setCategory([...category, c])
        }

    }
    const removeCategory = (e, c) => {
        e.preventDefault();
        const newCategory = category.filter(cat => cat !== c)
        setCategory(newCategory)
    }
    return (
        <>
            <form className={style.writeForm} onSubmit={publish}>
                <div className={style.mainimage}>
                    <input type="file" name="Image" id="main-image" onChange={(e) => mainOnchange(e, 'image')} disabled={dis} />
                    <div className={style.mainimagecontainer}>
                        <img src={postData.Image !== '' ? URL.createObjectURL(postData.Image) : null} alt="" />
                    </div>
                    <label className={style.upbtn} htmlFor='main-image'>Upload</label>
                </div>
                <div className={style.main}>
                    <input type='text' name='Title' value={Title} onChange={(e) => mainOnchange(e, 'string')} className={style.maintitle} placeholder='Title' required disabled={dis} />
                </div>
                <div className={style.categories}>
                    <div className={style.categorieslist} >
                        <h3>Categories:</h3>
                        {categoriesArray.map(c => (<button className={style.categorybtn}
                            onClick={(e) => addCategory(e, c)}>
                            {c}</button>))}
                    </div>
                    <div className={style.selectedcategories} >
                        <h3>Selected Categories:</h3>
                        {category.map(c => (<button className={style.categorybtn}
                            onClick={(e) => removeCategory(e, c)}>
                            {c}</button>))}
                    </div>

                </div>
                <div className={style.quill}>
                    <ReactQuill ref={quillRef} value={value} name='Text' onChange={setValue} placeholder='content...' modules={modules} />
                </div>
                <div style={{
                    marginTop: '10px',
                    zIndex: 999
                }} className={style.submit}>
                    <button type='submit' disabled={dis} className={style.submit}>Publish</button>
                </div>

            </form>

        </>
    )
}


export default Write