import st from './main.module.scss'
import { Typography } from "@mui/material";

function DigitalStatsCard({ icon, title, value }) {
    return (
        <div className={ st.container }>
            <div className={ st.icon }>
                { icon }
            </div>
            <div>
                <Typography variant={ 'body2' }>
                    { title }
                </Typography>
                <Typography variant={ 'body1' }>
                    { value }
                </Typography>
            </div>
        </div>
    )
}

export default DigitalStatsCard