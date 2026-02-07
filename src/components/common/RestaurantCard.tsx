import { restaurantImage } from "../../assets/icons"

interface RegionButtonProps {
    id : string,
}

function RegionButton({id} : RegionButtonProps) {
    const image = restaurantImage[id]
    return (
        <div>
            <img src={image} alt={id} />
        </div>
    )
}

export default RegionButton