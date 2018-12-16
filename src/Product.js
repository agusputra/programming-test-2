import React from 'react'
import U from './Utils'

function Ads({ product }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card text-white bg-primary">
        <div className="card-image-top">
          <img className="w-100" src={product.url} alt="ads" />
        </div>
        <div className="card-body">
          <div className="card-text">
            <strong className="card-title">Ads</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, minima.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  const date = U.formatDate(U.parseDateAndTz(product.date))

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card">
        <div className="card-image-top text-center text-light py-5 bg-dark" style={{ fontSize: product.size }}>
          {product.face}
        </div>
        <div className="card-body">
          <strong className="card-title">ID: {product.id}</strong>
          <div className="card-text">
            <div>{date}</div>
            <div>{product.size} px</div>
          </div>
          <strong>${product.price / 100}</strong>
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary btn-block">Buy</button>
        </div>
      </div>
    </div>
  )
}

export default function Product({ product }) {
  if (product.type === 'ads') {
    return (<Ads product={product} />)
  }
  else {
    return (<ProductCard product={product} />)
  }
}