import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function SignupPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
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
    if (password.length < 6) {
      setError('Your password must be at least 6 characters.')
      return
    }

    setIsSubmitting(true)
    try {
      await signUp(email.trim(), password)
      navigate('/')
    } catch (authError) {
      setError(authError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <p className="eyebrow">Join Reelora</p>
      <h1>Create your account</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="signup-email">Email</label>
        <input id="signup-email" onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
        <label htmlFor="signup-password">Password</label>
        <input id="signup-password" minLength="6" onChange={(event) => setPassword(event.target.value)} type="password" value={password} />
        {error && <p aria-live="polite" className="form-error" role="alert">{error}</p>}
        <button disabled={isSubmitting} type="submit">{isSubmitting ? 'Creating account…' : 'Create account'}</button>
      </form>
      <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
    </section>
  )
}

export default SignupPage