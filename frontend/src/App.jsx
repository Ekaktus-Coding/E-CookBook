import { Link, Route, Routes, Navigate } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage.jsx';
import RecipeCreatePage from './pages/RecipeCreatePage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import RecipeEditPage from './pages/RecipeEditPage.jsx';
import Button from './components/Button.jsx';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container">
          <Link to="/recipes" className="brand">
            E-CookBook
            <span className="brand__tagline">Recipe & ingredient manager</span>
          </Link>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/recipes/new" element={<RecipeCreatePage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/recipes/:id/edit" element={<RecipeEditPage />} />
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route
            path="*"
            element={
              <div className="not-found panel">
                <h1>Page not found</h1>
                <p>The page you requested does not exist.</p>
                <Button to="/recipes">Go to recipes</Button>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
