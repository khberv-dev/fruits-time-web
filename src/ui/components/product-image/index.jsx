import st from './main.module.css'

function ProductImage({ src, alt }) {
    return (
        <img
            className={ st.image }
            src={ src }
            alt={ alt }/>
    )
}

export default ProductImage