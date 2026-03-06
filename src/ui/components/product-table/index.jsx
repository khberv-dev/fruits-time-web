import { Button, Card, Spinner, Switch, Table, Text } from "@radix-ui/themes"
import Space from "@/ui/components/space/index.jsx"
import ProductImage from "@/ui/components/product-image/index.jsx"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { formatDateTime, formatPrice } from "@/utils/formatter.js"

function ProductTable({ data, isLoading }) {
    const navigate = useNavigate()

    return (
        <Card>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell style={ { width: '20px' } }>#</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell style={ { width: '60px' } }></Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Produkt</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Katalog</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Aktiv</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Narxi</Table.ColumnHeaderCell>
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
                                    src={ `${ import.meta.env.VITE_CDN_URL }product/${ item.image }` }
                                    alt={ item.title }/>
                            </Table.Cell>
                            <Table.Cell>
                                <Text size={ '3' }>
                                    { item.title }
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Text size={ '3' }>
                                    { item.category?.title }
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Switch checked={ item.isActive }/>
                            </Table.Cell>
                            <Table.Cell>
                                <Text size={ '3' }>
                                    { formatPrice(item.price) }
                                </Text>
                            </Table.Cell>
                            <Table.Cell>{ formatDateTime(item.createdAt) }</Table.Cell>
                            <Table.Cell>
                                <Button
                                    variant={ 'soft' }
                                    onClick={ () => navigate('/product/' + item.id) }>
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

export default ProductTable

