import {render} from '@testing-library/react'
import { ActiveLink } from './ActiveLink'

test('active link r3nders correcxtly', () => {
  render(
    <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
    </ActiveLink>
  )
})