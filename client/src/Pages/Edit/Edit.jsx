import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSinglePostData } from '../../hooks/useSinglePostData';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

const Edit = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])
    const { id } = useParams();
    const { isLoading, isError, error, data } = useSinglePostData(id)
    const [loading, setloading] = useState(false)
    const [postData, setPostData] = useState({
        Title: `${data?.data.title}`,
        Image: '',
    })
    const [images, setImages] = useState([])
    const [value, setValue] = useState(`${data?.data.text}`);
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
        formData.append('Images', images)
            ;
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const response = await axios.put(`http://localhost:5000/api/update/${id}`, formData, config)
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
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>

            <form className='writeForm' onSubmit={publish}>
                <div className="main-image">
                    <label htmlFor='main-image'>Upload</label>
                    <input type="file" name="Image" id="main-image" onChange={(e) => mainOnchange(e, 'image')} disabled={dis} />
                    <div className="mainimage-container">
                        <img src={postData.Image !== '' ? URL.createObjectURL(postData.Image) : data?.data.image} alt="" />
                    </div>

                </div>
                <div className='main'>
                    <input type='text' name='Title' value={Title} onChange={(e) => mainOnchange(e, 'string')} className='main-title' placeholder='Title' required disabled={dis} />
                    <ReactQuill ref={quillRef} value={value} name='Text' onChange={setValue} placeholder='content...' modules={modules} />
                </div>
                <div style={{
                    marginTop: '10px',
                    zIndex: 999
                }}>
                    <button type='submit' disabled={dis}>Publish</button>
                </div>

            </form>

        </>
    )
}

export default Edit