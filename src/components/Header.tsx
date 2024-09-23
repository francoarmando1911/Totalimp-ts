import { useState, useMemo } from 'react';
import type { CartItem, Product } from "../types";

type HeaderProps = {
    cart: CartItem[],
    removeFromCart: (id: Product['id']) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    clearCart: () => void,
    isEmpty: boolean,
    cartTotal: number
};

export default function Header({
    cart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart
}: HeaderProps) {
    const [isCartVisible, setIsCartVisible] = useState(false);

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() =>
        cart.reduce((total, item) => total + (item.quantity * item.price), 0),
        [cart]
    );

    const handleWhatsAppClick = () => {
        const numero = '5493442310036';
        let mensaje = 'Hola, me gustaría realizar el siguiente pedido:\n';

        cart.forEach((product, index) => {
            mensaje += `${index + 1}. ${product.name} - Cantidad: ${product.quantity}, Precio: $${product.price}\n`;
        });
        mensaje += `\nTotal a pagar: $${cartTotal}`;
        const enlace = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(enlace, '_blank');
    };

    const toggleCartVisibility = () => {
        setIsCartVisible(prev => !prev);
    };

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between align-items-center">
                    <div className="col-8 col-md-3 d-flex align-items-center">
                        <a href="/">
                            <img
                                className="img-fluid"
                                src="/GotaLogo.png" 
                                alt="Logo de TOTALIMP"
                            />
                        </a>
                    </div>
                    <div className="col-md-6 text-content text-center">
                        <h1 className="title" style={{ color: 'white' }}>TOTALIMP</h1>
                        <h2 className="subtitle" style={{ color: 'white' }}>Soluciones en limpieza</h2>
                    </div>
                    <nav className="col-md-3 d-flex align-items-center justify-content-end">
                        <div className="carrito position-relative">
                            <button
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill custom-badge"
                                style={{
                                    backgroundColor: '#dc3545',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '0.75rem'
                                }}
                                aria-label={`Carrito de compras con ${cart.length} items`}
                            >
                                {cart.length}
                            </button>
                            <img
                                className="img-fluid"
                                src="/carrito.png" 
                                alt="Carrito de compras"
                                onClick={toggleCartVisibility}
                                style={{ cursor: 'pointer' }}
                                role="button"
                                aria-pressed={isCartVisible}
                                aria-label="Mostrar u ocultar carrito de compras"

                            />    
                                <div
                                id="carrito"
                                className={`bg-white p-3 ${isCartVisible ? 'visible' : 'hidden'}`}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '100%',
                                    width: '300px',
                                    maxHeight: isCartVisible ? '500px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.5s ease, opacity 0.5s ease',
                                    opacity: isCartVisible ? 1 : 0,
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1000
                                }}
                                aria-hidden={!isCartVisible}
                            >
                                {isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(product => (
                                                    <tr key={product.id}>
                                                        <td>
                                                            <img
                                                                className="img-fluid"
                                                                src={`/${product.image}.png`} 
                                                                alt={`Imagen de ${product.name}`}
                                                                loading="lazy"
                                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                            />
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td className="fw-bold">${product.price.toFixed(2)}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark btn-sm"
                                                                    onClick={() => decreaseQuantity(product.id)}
                                                                    aria-label={`Disminuir cantidad de ${product.name}`}
                                                                >
                                                                    -
                                                                </button>
                                                                <span>{product.quantity}</span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark btn-sm"
                                                                    onClick={() => increaseQuantity(product.id)}
                                                                    aria-label={`Aumentar cantidad de ${product.name}`}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                type="button"
                                                                onClick={() => removeFromCart(product.id)}
                                                                aria-label={`Eliminar ${product.name} del carrito`}
                                                            >
                                                                &times;
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total a pagar: <span className="fw-bold">${cartTotal.toFixed(2)}</span></p>
                                    </>
                                )}
                                <button
                                    id="whatsapp-button"
                                    className="btn btn-whatsapp w-100 mt-3"
                                    onClick={handleWhatsAppClick}
                                    disabled={isEmpty}
                                    aria-disabled={isEmpty}
                                    style={{
                                        backgroundColor: '#008069', 
                                        borderColor: '#008069', 
                                        color: 'white',
                                        marginBottom: '10px'
                                    }}
                                >
                                    Realizar pedido
                                </button>
                                <button
                                    id="empty-cart-button"
                                    className="btn btn-empty-cart w-100 mt-2"
                                    onClick={clearCart}
                                    disabled={isEmpty}
                                    aria-disabled={isEmpty}
                                    style={{
                                        backgroundColor: 'red',
                                        borderColor: 'red',
                                        color: 'white'
                                    }}
                                >
                                    Vaciar carrito
                                </button>


                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
