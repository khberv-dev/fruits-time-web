import { IconButton, Switch } from "@mui/material";
import { formatDateTime } from "@/utils/formatter.js";
import ItemsTable from "@/ui/components/items-table/index.jsx";
import { Delete } from "@mui/icons-material";

function CategoryTable({ data, onIsActiveUpdate, onDeleteClick }) {
    const columns = [
        {
            name: '',
            render: (item, index) => (index + 1)
        },
        {
            name: '',
            render: (item) => <img style={ { height: '32px' } }
                                   src={ `${ import.meta.env.VITE_CDN_URL }banner/${ item.image }` }
                                   alt={ item.title }/>
        },
        {
            name: 'Aktiv',
            render: (item) => <Switch
                checked={ item.isActive }
                onChange={ (checked) => onIsActiveUpdate(item.id, checked.target.checked) }/>
        },
        {
            name: 'Sanasi',
            render: (item) => formatDateTime(item.createdAt)
        },
        {
            name: '',
            render: (item) =>
                <div className={ 'd-flex gap-2' }>
                    <IconButton onClick={ () => onDeleteClick(item) }><Delete/></IconButton>
                </div>
        }
    ]

    return (
        <ItemsTable
            columns={ columns }
            data={ data }/>
    )
}

export default CategoryTable