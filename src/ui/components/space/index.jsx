function Space({ width = 0, height = 0 }) {
    return (
        <div style={ { display: 'flex', width: width * 4 + 'px', height: height * 4 + 'px' } }></div>
    )
}

export default Space