import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { firebaseAuth } from '../firebase/config.js'

function getAuthErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'An account already exists for this email.',
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/weak-password': 'Your password must be at least 6 characters.',
  }

  return messages[error.code] || 'Authentication failed. Please try again.'
}

async function signUp(email, password) {
  try {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password)
  } catch (error) {
    throw new Error(getAuthErrorMessage(error))
  }
}

async function login(email, password) {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
  } catch (error) {
    throw new Error(getAuthErrorMessage(error))
  }
}

async function logout() {
  try {
    await signOut(firebaseAuth)
  } catch {
    throw new Error('We could not sign you out. Please try again.')
  }
}

export { login, logout, signUp }