import st from './main.module.css'
import { Text } from "@radix-ui/themes"
import { UploadIcon } from "@radix-ui/react-icons"
import { useRef, useState } from "react"

function ImageUpload({ src, value, onChange }) {
    const fileInput = useRef(null)
    const [image, setImage] = useState(null)

    const handleUploadFile = (e) => {
        const file = e.target.files[0]

        setImage(URL.createObjectURL(file))
        onChange(file)
    }

    return (
        <div
            className={ st.container }
            onClick={ () => fileInput.current.click() }>
            <div className={ st.overlay }>
                <UploadIcon/>
                <Text size={ '2' } color={ 'gray' }>
                    Rasm yuklash
                </Text>
            </div>
            { src || image ?
                <img
                    className={ st.preview }
                    src={ image ? image : src }
                    alt="fruits-time"/>
                : '' }
            <input
                ref={ fileInput }
                type="file"
                accept={ 'image/*' }
                onChange={ handleUploadFile }
                hidden/>
        </div>
    )
}

export default ImageUpload