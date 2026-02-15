import { Switch } from "@mui/material";
import { formatDateTime } from "@/utils/formatter.js";
import ItemsTable from "@/ui/components/items-table/index.jsx";

function CategoryTable({ data, onIsActiveUpdate }) {
    const columns = [
        {
            name: '',
            render: (item, index) => (index + 1)
        },
        {
            name: '',
            render: (item) => <img style={ { height: '32px' } }
                                   src={ `${ import.meta.env.VITE_CDN_URL }category/${ item.image }` }
                                   alt={ item.title }/>
        },
        {
            name: 'Nomi',
            render: (item) => item.title
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
        }
    ]

    return (
        <ItemsTable
            columns={ columns }
            data={ data }/>
    )
}

export default CategoryTable