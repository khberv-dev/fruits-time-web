import DigitalStatsCard from "@/ui/components/digital-stats-card/index.jsx";
import { AttachMoney, Group, Moving } from "@mui/icons-material";

function StatsPage() {
    return (
        <div>
            <div className={ 'd-flex gap-3' }>
                <DigitalStatsCard
                    icon={ <Group/> }
                    title={ 'Foydalanuvchilar' }
                    value={ 92 }/>

                <DigitalStatsCard
                    icon={ <Moving/> }
                    title={ 'Kunlik faol' }
                    value={ 546 }/>

                <DigitalStatsCard
                    icon={ <AttachMoney/> }
                    title={ 'Kunlik daromad' }
                    value={ '23 000 000 UZS' }/>
            </div>
        </div>
    )
}

export default StatsPage