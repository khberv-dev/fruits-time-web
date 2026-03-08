import st from './main.module.css'

function BannerImage({ src, alt }) {
    return (
        <div className={ st.wrapper }>
            { src ? (
                <img
                    className={ st.image }
                    src={ src }
                    alt={ alt ?? 'banner' }/>
            ) : null }
        </div>
    )
}

export default BannerImage
