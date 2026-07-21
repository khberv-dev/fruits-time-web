import {Pagination} from "@gravity-ui/uikit";
import s from "./main.module.css";

export default function ListPagination({page, pageSize, total, onUpdate, pageSizeOptions = [20, 50]}) {
    if (!total) return null

    return (
        <div className={s.root}>
            <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                pageSizeOptions={pageSizeOptions}
                onUpdate={onUpdate}
            />
        </div>
    )
}
