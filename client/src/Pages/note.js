<div className="preview" style={{ textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>{text}</p>
    {subTextdata.map((obj) => (
    <div key={obj.id}>
        <h2>{obj.subTitle}</h2>
        <p>{obj.text}</p>
    </div>
    ))}
</div>