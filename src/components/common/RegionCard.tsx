import { regionImage } from "../../assets/icons"

interface RegionCardProps {
    id : string,
}

function RegionCard({id} : RegionCardProps) {
    const image = regionImage[id]
    return (
        <div>
            <img src={image} alt={id} />
        </div>
    )
}

export default RegionCard