import setText , {appendText} from './results.mjs';

export async function get(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    setText(JSON.stringify(data));
}

export async function getCatch(){
    try{
    const {data} = await axios.get("http://localhost:3000/orders/123");
    setText(JSON.stringify(data));
    } 
    catch(error){
        setText(error);
    }
}

export async function chain(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    const {data: address} = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);

    setText(`City: ${JSON.stringify(address.city)}`);
}

export async function concurrent(){
    const orderStatus = axios.get("http://localhost:3000/orderStatuses");
    const orders = axios.get("http://localhost:3000/orders/1");

    setText("");

    const {data: orderStatusData} = await orderStatus;
    const {data: ordersData} = await orders;

    appendText(`Order Status: ${JSON.stringify(orderStatusData)}`);
    appendText(`Order: ${JSON.stringify(ordersData[0])}`);

}

export async function parallel(){
    setText("");

    await Promise.all([
        (async () => {
            const {data} = await axios.get("http://localhost:3000/orderStatuses");
            appendText(`Order Status: ${JSON.stringify(data)}`);
        })(),
        (async () => {
            const {data} = await axios.get("http://localhost:3000/orders");
            appendText(`Order: ${JSON.stringify(data)}`);
        })(),
    ]);
}