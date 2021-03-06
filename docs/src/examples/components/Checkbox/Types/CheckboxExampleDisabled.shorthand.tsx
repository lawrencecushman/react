import { Checkbox } from '@stardust-ui/react'
import * as React from 'react'

const CheckboxExampleDisabled = () => (
  <>
    <Checkbox disabled label="Disabled" />
    <Checkbox disabled checked label="Disabled & Checked" />
  </>
)

export default CheckboxExampleDisabled
