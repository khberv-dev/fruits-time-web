import { IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";

function ControlledList({ value, onChange, ...props }) {
    const handleKeyPressAndAddElement = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (e.target.value.length > 0) {
                onChange([...value, e.target.value])
                e.target.value = ''
            }
        }
    }

    const onItemRemoveClick = (index) => {
        onChange(value.filter((item, itemIndex) => itemIndex !== index))
    }

    return (
        <div { ...props }>
            <TextField
                label={ 'Element' }
                fullWidth={ true }
                placeholder={ "Qo'shish" }
                onKeyDown={ handleKeyPressAndAddElement }/>
            <br/><br/>
            { (value || []).map((item, index) =>
                <div
                    key={ index }
                    className={ 'd-flex justify-content-between align-items-center' }>
                    <div>
                        { item }
                    </div>
                    <div>
                        <IconButton
                            onClick={ () => onItemRemoveClick(index) }>
                            <Close/>
                        </IconButton>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default ControlledList