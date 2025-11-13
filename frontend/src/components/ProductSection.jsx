import React, { useState } from 'react'
import ProductCard from './ProductCard'



const ProductSection = ({ title, products }) => {

  const [active, setActive] = useState("featured");
  const filteredProducts = products.filter((p) => {
    if (active === "featured") return p.featured
    if (active === "topSeller") return p.topSeller
  })
  return (
    <>
      <section className='my-8'>

        <div className="container">
          <div className='text-center'>
            <h2 className='text-2xl font-normal mb-7  border-b-2 inline-block border-black '>{title}</h2>
          </div>

          <div>
            <ul className='flex gap-10 items-center justify-center mb-4'>
              <li className={`line ${active == "featured" ? 'line-active' : ''}`} onClick={() => setActive("featured")}>Featured Products</li>
              <li className={`line ${active == "topSeller" ? 'line-active' : ''}`} onClick={() => setActive("topSeller")}>Top Seller</li>

            </ul>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductSection