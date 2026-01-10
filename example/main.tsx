import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Shimmer } from '../src';
import './main.css';

// Example components with different structures
const UserCard = () => (
  <div className="card">
    <img
      src="https://via.placeholder.com/80"
      alt="User"
      className="avatar"
    />
    <div className="card-content">
      <h2>John Doe</h2>
      <p>Software Engineer</p>
      <p>San Francisco, CA</p>
    </div>
  </div>
);

const ArticlePreview = () => (
  <article className="article">
    <h1>Understanding React Hooks</h1>
    <p className="meta">By Jane Smith • 5 min read</p>
    <p className="excerpt">
      React Hooks revolutionized the way we write React components. In this
      article, we'll explore the most commonly used hooks and their best
      practices.
    </p>
    <button className="read-more">Read More</button>
  </article>
);

const ProductCard = () => (
  <div className="product-card">
    <img
      src="https://via.placeholder.com/300x200"
      alt="Product"
      className="product-image"
    />
    <div className="product-info">
      <h3>Awesome Product</h3>
      <div className="price">$99.99</div>
      <div className="rating">⭐⭐⭐⭐⭐</div>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  </div>
);

const DataTable = () => (
  <div className="table-container">
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alice Johnson</td>
          <td>alice@example.com</td>
          <td>Engineer</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>Bob Smith</td>
          <td>bob@example.com</td>
          <td>Designer</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>Carol Williams</td>
          <td>carol@example.com</td>
          <td>Manager</td>
          <td>Away</td>
        </tr>
        <tr>
          <td>David Brown</td>
          <td>david@example.com</td>
          <td>Developer</td>
          <td>Active</td>
        </tr>
      </tbody>
    </table>
  </div>
);

function App() {
  const [loadingUserCard, setLoadingUserCard] = useState(true);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);

  return (
    <div className="app">
      <header>
        <h1>✨ Shimmer From Structure</h1>
        <p>A shimmer library that adapts to your component's runtime structure</p>
      </header>

      <div className="demo-section">
        <div className="demo-card">
          <div className="demo-header">
            <h2>User Card Example</h2>
            <button onClick={() => setLoadingUserCard(!loadingUserCard)}>
              {loadingUserCard ? 'Show Content' : 'Show Shimmer'}
            </button>
          </div>
          <Shimmer loading={loadingUserCard}>
            <UserCard />
          </Shimmer>
        </div>

        <div className="demo-card">
          <div className="demo-header">
            <h2>Article Preview Example</h2>
            <button onClick={() => setLoadingArticle(!loadingArticle)}>
              {loadingArticle ? 'Show Content' : 'Show Shimmer'}
            </button>
          </div>
          <Shimmer
            loading={loadingArticle}
            shimmerColor="#d0d0ff"
            backgroundColor="#e8e8ff"
          >
            <ArticlePreview />
          </Shimmer>
        </div>

        <div className="demo-card">
          <div className="demo-header">
            <h2>Product Card Example</h2>
            <button onClick={() => setLoadingProduct(!loadingProduct)}>
              {loadingProduct ? 'Show Content' : 'Show Shimmer'}
            </button>
          </div>
          <Shimmer
            loading={loadingProduct}
            shimmerColor="#ffe0b2"
            backgroundColor="#fff3e0"
            duration={2}
            borderRadius={8}
          >
            <ProductCard />
          </Shimmer>
        </div>

        <div className="demo-card">
          <div className="demo-header">
            <h2>Data Table Example</h2>
            <button onClick={() => setLoadingTable(!loadingTable)}>
              {loadingTable ? 'Show Content' : 'Show Shimmer'}
            </button>
          </div>
          <Shimmer
            loading={loadingTable}
            shimmerColor="#c8e6c9"
            backgroundColor="#e8f5e9"
            duration={1.8}
          >
            <DataTable />
          </Shimmer>
        </div>
      </div>

      <footer>
        <p>
          The shimmer effect automatically adapts to the actual dimensions and
          layout of your components at runtime!
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
