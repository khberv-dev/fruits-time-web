import { Button, Card, Spinner, Switch, Table, Text } from "@radix-ui/themes"
import { formatDateTime } from "@/utils/formatter.js"
import Space from "@/ui/components/space/index.jsx"
import ProductImage from "@/ui/components/product-image/index.jsx"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

function CatalogTable({ data, isLoading }) {
    const navigate = useNavigate()

    return (
        <Card>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell style={ { width: '20px' } }>#</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell style={ { width: '60px' } }></Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Katalog</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Produktlar</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Aktiv</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Qo'shilgan vaqt</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell style={ { width: '20px' } }></Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    { (!isLoading ? data : []).map((item, index) =>
                        <Table.Row key={ index }>
                            <Table.RowHeaderCell>{ index + 1 }</Table.RowHeaderCell>
                            <Table.Cell>
                                <ProductImage
                                    src={ `${ import.meta.env.VITE_CDN_URL }category/${ item.image }` }
                                    alt={ item.title }/>
                            </Table.Cell>
                            <Table.Cell>
                                <Text size={ '3' }>
                                    { item.title }
                                </Text>
                            </Table.Cell>
                            <Table.Cell>{ item.productsCount }</Table.Cell>
                            <Table.Cell>
                                <Switch checked={ item.isActive }/>
                            </Table.Cell>
                            <Table.Cell>{ formatDateTime(item.createdAt) }</Table.Cell>
                            <Table.Cell>
                                <Button
                                    variant={ 'soft' }
                                    onClick={ () => navigate('/catalog/' + item.id) }>
                                    <Pencil1Icon/>
                                    Tahrirlash
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ) }
                </Table.Body>
            </Table.Root>
            { isLoading ?
                <center>
                    <Space height={ 4 }/>
                    <Spinner/>
                </center>
                : '' }
        </Card>
    )
}

export default CatalogTable