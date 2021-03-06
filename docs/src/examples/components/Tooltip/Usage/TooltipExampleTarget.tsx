import * as React from 'react'
import { Button, Divider, Grid, Ref, Text, Tooltip } from '@stardust-ui/react'

const TooltipExampleTarget = () => {
  const [target, setTarget] = React.useState<HTMLElement>(null)

  return (
    <Grid columns="auto 1fr">
      {/* CUSTOM DOM ELEMENT is used as target for Tooltip */}
      <Tooltip
        target={target}
        content="well, yes, I am just a garbish text ¯\_(ツ)_/¯"
        position="below"
      >
        <Button icon="question" circular styles={{ cursor: 'pointer' }} />
      </Tooltip>
      <div style={{ marginLeft: 10 }}>
        <Text>Could you guess what does this text means? :)</Text>
        <Divider />
        <Ref innerRef={setTarget}>
          <Text>
            "To the lascivious looking-glass I, that love's majesty to strut before a want love's
            majesto, to the souls of York."
          </Text>
        </Ref>
      </div>
    </Grid>
  )
}

export default TooltipExampleTarget
