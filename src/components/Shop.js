import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";


function Shop({shop}){
    return (
        <Stack direction="horizontal" gap={3} className="Shop">
            <Image src={shop.avatar_url + '&s=48'}  alt={shop.name} roundedCircle/>
            <div>
                <p>
                    <Link to={'/shop/' + shop.name}>
                        {shop.name}
                    </Link>
                    <div>Email: {shop.email}</div>
                    <br />
                    <div>Address: {shop.full_address}</div>
                </p>
            </div>
        </Stack>
    );
}

export default Shop;