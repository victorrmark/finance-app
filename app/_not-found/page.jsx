export default function NotFound() {
  return (
    <div>
      <h1>404 – Page Not Found</h1>
      <p>Sorry, this page doesn’t exist.</p>
      <button onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  )
}