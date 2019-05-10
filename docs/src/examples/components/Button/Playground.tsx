import { useBooleanKnob, useSelectKnob, useStringKnob } from '@stardust-ui/docs-components'
import { Button } from '@stardust-ui/react'
import * as React from 'react'

import componentInfoContext from '../../../utils/componentInfoContext'

const ButtonPlayground: React.FunctionComponent = () => {
  const [content] = useStringKnob({
    name: 'content',
    initialValue: 'A sample Button',
  })

  const [icon] = useSelectKnob({
    name: 'icon',
    initialValue: 'camera',
    values: ['book', 'camera'],
  })

  const knobProps = {}
  componentInfoContext.byDisplayName.Button.props.forEach(({ name, defaultValue, type }) => {
    //
    // Boolean
    //
    if (type === 'boolean') {
      const [knobValue] = useBooleanKnob({ name, initialValue: defaultValue })
      if (knobValue !== undefined) knobProps[name] = knobValue
    }

    //
    // Select
    //
    if (type.includes(' | ')) {
      const values = type.replace(/"/g, '').split(' | ')
      const [knobValue] = useSelectKnob({ name, initialValue: values[0], values })

      if (knobValue !== undefined) knobProps[name] = knobValue
    }

    //
    // String & Shorthand
    //
    if (type === 'string' || type.includes('ShorthandValue')) {
      const [knobValue] = useStringKnob({ name, initialValue: defaultValue })
      if (knobValue !== undefined) knobProps[name] = knobValue
    }
  })

  return <Button {...knobProps} content={content} icon={icon} />
}

export default ButtonPlayground
