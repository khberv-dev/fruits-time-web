import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";

function ItemsTable({ columns, data }) {
    return (
        <Paper style={ { border: '1px solid #8D8D8D', borderRadius: '8px', overflow: 'hidden' } }>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            { columns.map((column, index) =>
                                <TableCell key={ index }>
                                    { column.name }
                                </TableCell>
                            ) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { data.map((row, index) =>
                            <TableRow key={ index } hover>
                                { columns.map((column, index) =>
                                    <TableCell
                                        key={ index }>
                                        { column.render(row, index) }
                                    </TableCell>) }
                            </TableRow>
                        ) }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage={ '' }
                component={ 'div' }
                count={ 900 }
                onPageChange={ () => {
                } }
                page={ 1 }
                rowsPerPageOptions={ [10, 25, 50, 100] }
                rowsPerPage={ 10 }/>
        </Paper>
    )
}

export default ItemsTable