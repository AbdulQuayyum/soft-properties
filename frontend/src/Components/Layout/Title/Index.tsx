import React from 'react'
import { useRouterContext, TitleProps } from '@pankod/refine-core'
import { Button } from '@pankod/refine-mui'

import { logo } from 'Assets/Index'

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext()

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Logo" width="28px" height="auto" />
        ) : (
          <img src={logo} alt="Logo" width="50px" height="auto" />
        )}
      </Link>
    </Button>
  )
}