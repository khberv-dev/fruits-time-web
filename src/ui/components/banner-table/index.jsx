import { Button, Card, Spinner, Switch, Table, Text } from "@radix-ui/themes"
import Space from "@/ui/components/space/index.jsx"
import BannerImage from "@/ui/components/banner-image/index.jsx"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { formatDateTime } from "@/utils/formatter.js"

function BannerTable({ data, isLoading }) {
    const navigate = useNavigate()

    return (
        <Card>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell style={ { width: '20px' } }>#</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell style={ { width: '80px' } }></Table.ColumnHeaderCell>
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
                                <BannerImage
                                    src={ (item.image && item.image.startsWith('http'))
                                        ? item.image
                                        : `${ import.meta.env.VITE_CDN_URL }banner/${ item.image }` }
                                    alt={ 'banner' }/>
                            </Table.Cell>
                            <Table.Cell>
                                <Switch checked={ item.isActive }/>
                            </Table.Cell>
                            <Table.Cell>
                                <Text size={ '2' }>
                                    { formatDateTime(item.createdAt) }
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    variant={ 'soft' }
                                    onClick={ () => navigate('/banner/' + item.id) }>
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

export default BannerTable

