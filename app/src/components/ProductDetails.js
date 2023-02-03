import React from 'react'
import { Link, useParams } from 'react-router-dom'

function ProductDetails() {
  const {id}=useParams();
  return (
    <div>
        <Link to="/">
        <button>Back</button>
        </Link>
        ProductDetails - {id}
    </div>
  )
}

export default ProductDetails