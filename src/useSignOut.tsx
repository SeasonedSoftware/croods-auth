import { useCroods } from 'croods'
import {
  ActionOptions,
  InstanceOptions,
} from 'croods/dist/types/typeDeclarations'
import getBaseOpts from './getBaseOpts'
import { clearHeaders } from './headersHelpers'
import { useMounted, useOnUnmount } from './hooks'
import { AxiosResponse } from 'axios'
import { SignOutState } from './typeDeclarations'

function useSignOut(
  options: ActionOptions = {},
): [SignOutState, (t: Function) => void] {
  const afterSuccess = (response: AxiosResponse) => {
    clearHeaders(options)
    options.afterSuccess && options.afterSuccess(response)
  }

  const opts = {
    ...getBaseOpts(options, 'signOut'),
    operation: 'info',
    afterSuccess,
  }
  const mounted = useMounted()

  const [
    { destroying: signingOut, destroyError: error },
    { destroy, setInfo, resetState },
    //@ts-ignore
  ] = useCroods(opts as InstanceOptions)

  useOnUnmount(resetState)

  return [
    { signingOut: !!signingOut, error },
    async callback => {
      await destroy({})()
      if (typeof callback === 'function') callback()
      mounted && setInfo(null, false)
    },
  ]
}

export default useSignOut
