import React from 'react'
import U from './Utils'

export default function Product(props) {
  const { product } = props
  const date = U.formatDate(U.parseDateAndTz(product.date))

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card">
        <div className="card-image-top text-center bg-dark text-light py-5" style={{ fontSize: product.size }}>
          {product.face}
        </div>
        <div className="card-body">
          <h5 className="card-title">Face {product.id}</h5>
          <p className="card-text">{date}</p>
          <strong>${product.price / 100}</strong>
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary btn-block" onClick={() => alert("not implemented")}>Buy</button>
        </div>
      </div>
    </div>
  )
}