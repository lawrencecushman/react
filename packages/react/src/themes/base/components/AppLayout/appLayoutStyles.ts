import { ComponentSlotStylesInput } from '../../../types'
import AppLayout, { AppLayoutProps } from '../../../../components/AppLayout/AppLayout'

import { AppLayoutVariables } from './appLayoutVariables'

const debugChromeStyle = {
  padding: '0.5rem',
  margin: '4rem',
  height: '80vh',
  background: '#EEE',
  border: '1px solid #CCC',
  borderTop: '32px solid #DDD',
  borderRadius: '4px',
  boxShadow: '0 0.25em 1em rgba(0, 0, 0, 0.15)',
}

const appLayoutStyles: ComponentSlotStylesInput<AppLayoutProps, AppLayoutVariables> = {
  root: ({ props }) => ({
    display: 'grid',
    gridGap: props.gap,
    gridTemplate: props.template,
    ...Object.keys(props.slots).reduce((acc, k) => {
      acc[`> .${AppLayout.className}__${k}`] = { gridArea: k }
      return acc
    }, {}),

    ...debugChromeStyle,

    '> *': {
      position: 'relative',
      padding: '1em',
      background: '#fffe',
      borderRadius: '2px',
      textAlign: 'center',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',

      // DEBUG
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 100,
      color: 'rgba(0, 0, 0, 0.5)',
    },
  }),
}

export default appLayoutStyles
