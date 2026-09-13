import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address.')
      return
    }
    if (!password) {
      setError('Enter your password.')
      return
    }

    setIsSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate('/')
    } catch (authError) {
      setError(authError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <p className="eyebrow">Welcome back</p>
      <h1>Log in to Reelora</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" minLength="6" onChange={(event) => setPassword(event.target.value)} type="password" value={password} />
        {error && <p aria-live="polite" className="form-error" role="alert">{error}</p>}
        <button disabled={isSubmitting} type="submit">{isSubmitting ? 'Logging in…' : 'Log in'}</button>
      </form>
      <p className="auth-switch">New to Reelora? <Link to="/signup">Create an account</Link></p>
    </section>
  )
}

export default LoginPage