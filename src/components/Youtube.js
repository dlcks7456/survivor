function Youtube({src}){
    const changeLink = `https://www.youtube.com/embed/${src.split("/").slice(-1)[0]}`;
    return (
        <iframe width="100%" height="400px" src={changeLink}></iframe>
    )
}

export default Youtube