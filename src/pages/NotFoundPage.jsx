import { Link } from 'react-router-dom'

function NotFoundPage() {
  return <section className="placeholder-page"><h1>Page Not Found</h1><p>This route does not exist. <Link to="/">Return home.</Link></p></section>
}

export default NotFoundPage