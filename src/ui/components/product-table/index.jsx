import { Switch } from "@mui/material";
import { formatDateTime, formatNumber } from "@/utils/formatter.js";
import ItemsTable from "@/ui/components/items-table/index.jsx";

function ProductTable({ data, onIsActiveUpdate }) {
    const columns = [
        {
            name: '',
            render: (item, index) => (index + 1)
        },
        {
            name: '',
            render: (item) => <img style={ { height: '32px' } }
                                   src={ `${ import.meta.env.VITE_CDN_URL }product/${ item.image }` }
                                   alt={ item.title }/>
        },
        {
            name: 'Nomi',
            render: (item) => item.title
        },
        {
            name: 'Narxi',
            render: (item) => formatNumber(item.price) + " so'm"
        },
        {
            name: 'Turi',
            render: (item) => item.type
        },
        {
            name: 'Katalog',
            render: (item) => item.category.title
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

export default ProductTable