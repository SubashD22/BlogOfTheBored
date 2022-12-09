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
                <input type="file" name="subImage" id={`sub-upimage${subText.id}`} className='sub-upload' onChange={(e) => handleChange(e, subText, 'image')} disabled={dis} />
            </div>
            <textarea value={subText.text} name='subText' onChange={(e) => handleChange(e, subText)} placeholder='content...' className='sub-text' required={required} disabled={dis} />
            {subText.id !== 1 ? <button onClick={(e) => Deleteform(e, subText.id)} disabled={dis}>Delete</button> : null}
        </div>
    )
})}

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