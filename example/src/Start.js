import React from 'react'
import { navigate } from '@reach/router'
import { useSignOut, useDeleteAccount, useCurrentUser } from 'croods-light-auth'

import basePath from './basePath'

export default () => {
  const [{ currentUser }] = useCurrentUser()
  const [{ signingOut }, signOut] = useSignOut()
  const [{ deletingAccount }, deleteAccount] = useDeleteAccount()

  return currentUser ? (
    <div>
      <p>Logged in as {currentUser.name}</p>
      <button className="btn btn-primary" onClick={signOut}>
        {signingOut ? 'Signing Out...' : 'Sign Out'}
      </button>{' '}
      <button
        className="btn btn-danger"
        onClick={() => {
          // eslint-disable-next-line
          const shouldDelete = window.confirm('Are you sure?')
          shouldDelete && deleteAccount()
        }}
      >
        {deletingAccount ? 'Deleting account...' : 'Delete account'}
      </button>
    </div>
  ) : (
    <div>
      <p>You are not logged in...</p>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`${basePath}/sign-in`)}
      >
        Go to Sign In Page
      </button>
    </div>
  )
}
