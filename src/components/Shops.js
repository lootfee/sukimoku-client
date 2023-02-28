import { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvider";
import Spinner from "react-bootstrap/Spinner";
import Shop from "./Shop";


function Shops(){
    const [shops, setShops] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
          const response = await api.get('/shops');
          if (response.ok) {
            setShops(response.body.data);
          }
          else {
            setShops(null);
          }
        })();
      }, [api]);

    return (
        <>
            {shops === undefined ?
                <Spinner animation="border" />
            :
                <>
                {shops.length === 0 ?
                
                <p>There are no shops listed in your area.</p>
                :
                    shops.map(shop => <Shop key={shop.id } shop={shop}/>)
                }
                </>
            }
        </>
    );
}



export default Shops;