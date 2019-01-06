import React from 'react'
import _ from 'lodash'
import Product from './Product'

export default class App extends React.Component {
  state = {
    limit: 100,
    products: [],
    cache: [],
    sort: null,
    page: 0,
    loading: false,
    end: false,
  }

  componentDidMount() {

    // Creates a throttled function that only invokes func at most once per every wait milliseconds.
    document.addEventListener('scroll', _.throttle(e => {

      // If scroll is 1200px from bottom then load.
      if (window.innerHeight + window.scrollY >= (document.body.scrollHeight - 1200)) {
        !this.state.loading && this.load(this.state.page)
      }
    }, 200))

    this.load(1)
  }

  async load(page, sort) {
    if (this.state.loading || (this.state.end && !sort)) {
      return
    }

    if (page === 1 || sort) {
      debugger
      const products = await this.loadFromServer(page, sort)
      this.setState({ products: insertAds(products), cache: [] })

      //Pre-emptively fetch the next results.
      this.populateCache(page)
    }
    else if (this.state.cache.length) {
      this.setState({ products: this.state.products.concat(this.state.cache), cache: [] })

      //Pre-emptively fetch the next results.
      this.populateCache(page)
    }
  }

  async populateCache(page) {
    const products = await this.loadFromServer(page + 1, null)
    this.setState({ cache: insertAds(products) })
  }

  async loadFromServer(page, sort) {
    let query = `_limit=${this.state.limit}&_page=${page}`

    if (sort) {
      query += `&_sort=${sort}`
    }
    else if (this.state.sort) {
      query += `&_sort=${this.state.sort}`
    }

    const state = { loading: true, page }

    // If new sort then first we empty the products.
    if (sort) {
      state.sort = sort
      state.end = false
      state.products = []
    }

    this.setState(state)
    const l = document.location
    const products = await fetch(`${l.protocol}//${l.hostname}:3000/products?${query}`).then(res => res.json())
    this.setState({ loading: false, end: products.length === 0 })

    return products
  }

  render() {
    const sort = this.state.sort
    const sortButtonClass = "btn btn-secondary ml-3"
    const loading = this.state.loading

    return (
      <React.Fragment>
        <a href="/"><div className="jumbotron"><h1>ASCII Faces Store</h1></div></a>
        <div className="container">
          <div className="row">
            <div className="col-12 text-right my-3">
              <span>Sort:</span>
              <button className={sortButtonClass} disabled={sort === 'size' || loading} onClick={() => this.load(1, 'size')}>Size</button>
              <button className={sortButtonClass} disabled={sort === 'price' || loading} onClick={() => this.load(1, 'price')}>Price</button>
              <button className={sortButtonClass} disabled={sort === 'id' || loading} onClick={() => this.load(1, 'id')}>ID</button>
            </div>
          </div>
          <div className="row">
            {this.state.products.map(p => (<Product product={p} key={p.id} />))}
          </div>
          {
            !!this.state.products.length &&
            <p>Loaded {this.state.products.length} items</p>
          }
          {
            loading &&
            <div className="loading-indicator">
              <p>..loading..</p>
            </div>
          }
          {
            this.state.end && <h2 className="my-5 text-center">~ end of catalogue ~</h2>
          }
          <button className="btn btn-top bg-dark text-muted" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>TOP</button>
        </div>
      </React.Fragment >
    )
  }
}

function insertAds(products) {
  const max = products.length
  let i = 0
  let step = 20

  for (let j = step; j <= max; j += step) {
    const id = generateUniqRandom().toString().substr(2)
    products.splice(j + i++, 0, { id, type: 'ads', url: `http://localhost:3000/ads/?r=${id}` });
  }

  return products
}

const random = []
function generateUniqRandom() {
  const ran = Math.random()
  if (_.find(random, ran)) {
    return generateUniqRandom()
  } else {
    return ran
  }
}