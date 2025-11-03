const Product = (props) => {
    return (
        <>
            <div>
                <h3>상품명:{props.productName}</h3>
                <p>가격:원{props.price}</p>
            </div>
        </>
    );
};

export default Product;