import React from 'react'
import axios from 'axios'
import Product from './Product'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { products: [] }
  }

  componentDidMount() {
    const l = document.location
    axios.get(`${l.protocol}//${l.hostname}:3000/products?_page=1&_limit=15`)
      .then(res => {
        this.setState({ products: res.data })
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron"><h1>ASCII Faces Store</h1></div>
        <div className="container">
          <div className="row">
            {this.state.products.map(p => (<Product product={p} key={p.id} />))}
          </div>
        </div>
      </React.Fragment>
    )
  }
}