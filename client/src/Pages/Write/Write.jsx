import React, { useState } from 'react';
import { useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { FaRegArrowAltCircleUp } from 'react-icons/fa'
import { BsFillXCircleFill } from "react-icons/bs";
import axios from 'axios';
import './Write.css'


function Write() {
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState({
        title: '',
        text: '',
        image: '',
        public_id: ''
    })
    const { title, text } = postData;
    const mainOnchange = (e) => {
        setPostData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    const [subTextdata, setSubtextData] = useState([
        {
            id: 1,
            subTitle: '',
            text: '',
            image: '',
            image_id: ''
        }
    ])
    const addSubtext = (e) => {
        e.preventDefault()
        const newSubtext = [
            ...subTextdata,
            {
                id: subTextdata.length + 1,
                subTitle: '',
                text: '',
                image: '',
                public_id: ''
            }
        ];
        setSubtextData(newSubtext)
    }
    const handleChange = (e, subtext) => {
        setSubtextData(prevData =>
            prevData.map(obj => {
                if (obj.id === subtext.id) {
                    return { ...obj, [e.target.name]: e.target.value }
                }
                return obj
            }))
    }
    const uploadImage = async (e) => {
        setLoading(true)
        const formdata = new FormData();
        formdata.append('file', e.target.files[0])
        formdata.append('upload_preset', 'vvt9zrms')
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/drsavv8ma/image/upload', formdata)
        if (data) {
            const newdata = {
                ...postData,
                image: data.url,
                public_id: data.public_id
            }
            console.log(newdata)
            setLoading(false)
            return setPostData(newdata);
        }
    }
    const uploadsubImage = async (e, subtext) => {
        const formdata = new FormData();
        formdata.append('file', e.target.files[0])
        formdata.append('upload_preset', 'vvt9zrms')
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/drsavv8ma/image/upload', formdata)
        if (data) {
            setSubtextData(prevData =>
                prevData.map(obj => {
                    if (obj.id === subtext.id) {
                        return {
                            ...obj,
                            image: data.url,
                            public_id: data.public_id
                        }
                    }
                    return obj
                }))
        }
    }
    const delTimg = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            public_id: postData.public_id
        }
        const response = await axios.post('http://localhost:5000/api/delete', data)
        if (response.status === 200) {
            const newdata = {
                ...postData,
                image: '',
                public_id: ''
            }
            console.log(newdata)
            setPostData(newdata);
            setLoading(false)
        }
    }
    const delSubimg = async (e, subText) => {
        e.preventDefault();
        const data = {
            public_id: subText.public_id
        }
        const response = await axios.post('http://localhost:5000/api/delete', data);
        if (response.status === 200) {
            setSubtextData(prevData =>
                prevData.map(obj => {
                    if (obj.id === subText.id) {
                        return {
                            ...obj,
                            image: "",
                            public_id: ""
                        }
                    }
                    return obj
                }))
        }


    }
    let imageSrc;
    if (postData.image !== "") {
        imageSrc = postData.image
    } else {
        imageSrc = "https://fakeimg.pl/1920x1080/"
    }
    const subimgsrc = "https://fakeimg.pl/1200x900/"
    return (
        <>

            <form className='writeForm'>
                <div className="main-image">
                    <label htmlFor='main-image'
                        style={{
                            display: `${postData.image !== "" ? 'none' : 'block'}`
                        }}><FaRegArrowAltCircleUp /></label>
                    <input type="file" name="image" id="main-image" onChange={uploadImage} />
                    {loading === true ? <div className='loading-main'><RotatingLines /></div> : <img src={imageSrc}></img>}

                    <button style={{
                        display: `${postData.image !== "" ? 'block' : 'none'}`
                    }} onClick={delTimg}><BsFillXCircleFill /></button>
                </div>
                <div className='main'>
                    <input type='text' name='title' value={title} onChange={mainOnchange} className='main-title' placeholder='Title' />
                    <textarea name="text" id="text" value={text} onChange={mainOnchange} className='main-text' placeholder='Content...' />
                </div>

                {subTextdata.map((subText) => (
                    <div key={subText.id} className='sub'>
                        <input type='text' value={subText.subTitle} name='subTitle' onChange={(e) => handleChange(e, subText)} placeholder='Sub Title' className='sub-title' />
                        <div className="sub-image">
                            <label htmlFor={`sub-upimage${subText.id}`}
                                style={{
                                    display: `${subText.image !== "" ? 'none' : 'block'}`
                                }}>
                                <FaRegArrowAltCircleUp />
                            </label>
                            <input type="file" name="image" id={`sub-upimage${subText.id}`} className='sub-upload' onChange={(e) => uploadsubImage(e, subText)} />
                            <img src={subText.image === '' ? subimgsrc : subText.image}></img>
                            <button onClick={(e) => delSubimg(e, subText)}
                                style={{
                                    display: `${subText.image !== "" ? 'block' : 'none'}`
                                }}>Delete</button>
                        </div>
                        <textarea value={subText.text} name='text' onChange={(e) => handleChange(e, subText)} placeholder='content...' className='sub-text' />
                    </div>
                ))}
                <button onClick={addSubtext}>Add SubText</button>
                <div style={{
                    marginTop: '10px'
                }}>
                    <button type='submit'>Publish</button>
                </div>
            </form>
        </>
    )
}

export default Write