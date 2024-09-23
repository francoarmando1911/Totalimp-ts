import Header from './components/Header'
import Products from './components/Products'
import { useCart } from './hooks/useCart'

function App() {

  // Custom Hook para manejar el carrito
  const { data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestros Productos</h2>
        <hr />
        
        <div className="row mt-5">
          {data.map((product) => (
            <Products
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">TOTALIMP - (3442) 310036 - Concepcion del Uruguay</p>
        </div>
      </footer>
    </>
  )
}

export default App
