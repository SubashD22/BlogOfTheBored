import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Write.css'

function Writedemo() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])
    const token = user.token
    const [loading, setloading] = useState(false)
    const [postData, setPostData] = useState({
        mainTitle: '',
        mainText: '',
        mainImage: '',
    })
    const { title, text, image } = postData
    const [subTextdata, setSubtextData] = useState([
        {
            id: 1,
            subTitle: '',
            subText: '',
            subImage: '',
        }
    ]);
    const mainOnchange = (e, type) => {
        const value = type === 'image' ? e.target.files[0] : e.target.value
        setPostData((prevData) => ({
            ...prevData,
            [e.target.name]: value
        }))
    }
    const addSubtext = (e) => {
        e.preventDefault()
        if (subTextdata[subTextdata.length - 1].subTitle !== '' || subTextdata[subTextdata.length - 1].subText !== '') {

            const newSubtext = [
                ...subTextdata,
                {
                    id: subTextdata.length + 1,
                    subTitle: '',
                    subText: '',
                    subImage: '',
                }
            ];
            setSubtextData(newSubtext)
        } else alert('please fill previous subtext fields')

    };
    const handleChange = (e, subtext, type) => {
        const value = type === 'image' ? e.target.files[0] : e.target.value
        setSubtextData(prevData =>
            prevData.map(obj => {
                if (obj.id === subtext.id) {
                    return { ...obj, [e.target.name]: value }
                }
                return obj
            }))
    }
    const publish = async (e) => {
        e.preventDefault();
        setloading(true);
        const formData = new FormData
        if (subTextdata[0].subTitle !== '' || subTextdata[0].subText !== '') {
            for (let key in postData) {
                formData.append(key, postData[key])
            }
            subTextdata.forEach((sb) => {
                formData.append('subImage', sb.subImage)
                const subData = JSON.stringify({
                    subTitle: sb.subTitle,
                    subText: sb.subText
                })
                formData.append('subData', subData)
            })

        } else {
            for (let key in postData) {
                formData.append(key, postData[key])
            }
        };
        console.log(formData)
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
    const Deleteform = (e, id) => {
        e.preventDefault();
        const newdata = subTextdata.filter((s) => s.id !== id);
        setSubtextData(newdata)
    }
    let dis
    if (loading) {
        dis = true
    } else dis = false
    return (
        <>

            <form className='writeForm' onSubmit={publish}>
                <div className="main-image">
                    <label htmlFor='main-image'>Upload</label>
                    <input type="file" name="mainImage" id="main-image" onChange={(e) => mainOnchange(e, 'image')} disabled={dis} />
                    <div className="mainimage-container">
                        <img src={postData.mainImage !== '' ? URL.createObjectURL(postData.mainImage) : null} alt="" />
                    </div>

                </div>
                <div className='main'>
                    <input type='text' name='mainTitle' value={title} onChange={(e) => mainOnchange(e, 'string')} className='main-title' placeholder='Title' required disabled={dis} />
                    <textarea name="mainText" id="text" value={text} onChange={(e) => mainOnchange(e, 'string')} className='main-text' placeholder='Content...' required disabled={dis} />
                </div>

                {subTextdata.map((subText) => {
                    let required;
                    if (subText.subImage !== '' || subText.id !== 1) {
                        required = true
                    } else required = false
                    let imagereq;
                    if (subTextdata[subTextdata.length - 1].subImage !== '') { imagereq = true } else imagereq = false
                    return (
                        <div key={subText.id} className='sub'>
                            <input type='text' value={subText.subTitle} name='subTitle' onChange={(e) => handleChange(e, subText)} placeholder='Sub Title' className='sub-title'
                                required={required} disabled={dis} />
                            <div className="sub-image">
                                <label htmlFor={`sub-upimage${subText.id}`}>
                                    Upload
                                </label>
                                <input type="file" name="subImage" id={`sub-upimage${subText.id}`} className='sub-upload' onChange={(e) => handleChange(e, subText, 'image')} required={imagereq} disabled={dis} />
                            </div>
                            <textarea value={subText.text} name='subText' onChange={(e) => handleChange(e, subText)} placeholder='content...' className='sub-text' required={required} disabled={dis} />
                            {subText.id !== 1 ? <button onClick={(e) => Deleteform(e, subText.id)} disabled={dis}>Delete</button> : null}
                        </div>
                    )
                })}
                <button onClick={addSubtext} disabled={dis}>Add SubText</button>
                <div style={{
                    marginTop: '10px'
                }}>
                    <button type='submit' disabled={dis}>Publish</button>
                </div>
            </form>
        </>
    )
}

export default Writedemo