import type { Product } from "../types";

type ProductProps = {
    product: Product,
    addToCart: (item: Product) => void;
}

export type ProductID = Product['id']

export default function Products({ product, addToCart }: ProductProps) {
    const { id, name, image, description, price } = product;

    // Render a customized description for the product with id: 10  
    const renderDescription = () => {
        if (id === 10) {
            return (
                <p
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                    style={{ color: 'red' }} // Red color for the description of the product with id 10  
                />
            );
        }
        return <p>{description}</p>;
    };

    return (
        <div className="col-md-6 col-lg-4 my-4 d-flex justify-content-center">
            <div className="row align-items-center">
                {/* Condition to show or hide the image */}
                {id !== 19 && (
                    <div className="col-4">
                        <img className="img-fluid" src={`/${image}.png`} alt="Product image" />
                    </div>
                )}

                <div className={`col-8 ${id === 19 ? 'text-center' : ''}`}>
                    <h3
                        className="fs-4 fw-bold text-uppercase"
                        style={id === 19 ? { color: 'red' } : {}}
                    >
                        {name}
                    </h3>
                    {renderDescription()}
                    <p
                        className="fw-black fs-3"
                        style={id === 19 ? { color: 'red' } : {}}
                    >
                        ${price}
                    </p>

                    {/* Condition to show or hide the button */}
                    {id !== 19 && (
                        <button
                            type="button"
                            className="btn btn-dark w-100"
                            onClick={() => addToCart(product)}
                        >
                            Agregar al Carrito
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}