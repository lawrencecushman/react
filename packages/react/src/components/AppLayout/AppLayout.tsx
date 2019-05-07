import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { commonPropTypes, ContentComponentProps, UIComponent, UIComponentProps } from '../../lib'
import { RenderResultConfig } from '../../lib/renderComponent'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactProps, ShorthandValue } from '../../types'

export interface AppSlotClassNames {
  content: string
}

export interface AppLayoutProps extends UIComponentProps, ContentComponentProps<ShorthandValue> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default AppBehavior
   * @available AppWarningBehavior
   */
  accessibility?: Accessibility

  gap?: string
  mode?: string
  slots?: {
    header?: () => React.ReactNode
    navbar?: () => React.ReactNode
    full?: () => React.ReactNode
    tile?: () => React.ReactNode
    startbar?: () => React.ReactNode
    content?: () => React.ReactNode
    endbar?: () => React.ReactNode
  }
  template?: string
}

/**
 * A app layout contains and arranges the high level areas of an application.
 */
class AppLayout extends UIComponent<ReactProps<AppLayoutProps>> {
  static displayName = 'AppLayout'
  static className = 'ui-app-layout'

  static slotClassNames: AppSlotClassNames = {
    content: `${AppLayout.className}__content`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    gap: PropTypes.string,
    slots: PropTypes.objectOf(PropTypes.func),
    template: PropTypes.string,
  }

  map = new Map()

  componentWillUpdate(nextProps, nextState) {
    const node = findDOMNode(this)
    if (!node) return

    node.childNodes.forEach((child: HTMLElement & any) => {
      child.prevBox = child.getBoundingClientRect()
    })
  }

  componentDidUpdate(
    prevProps: Readonly<ReactProps<AppLayoutProps>>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    const node = findDOMNode(this)

    if (!node) {
      return
    }

    const DURATION_MS = 800
    const isClose = (x, y) => Math.abs(Math.round(x) - Math.round(y)) < 10

    node.childNodes.forEach((child: any) => {
      //
      // SET LAST STYLE
      //

      if (!child.prevBox) {
        const rect = child.getBoundingClientRect()
        // default "IN" transition, this node has no prev box
        child.style.opacity = 0
        const signX = (rect.left + rect.right) / 2 > window.innerWidth / 2 ? 1 : -1
        const signY = (rect.top + rect.botom) / 2 > window.innerHeight / 2 ? 1 : -1
        child.style.transform = `scale3d(0.75, 0.75, 0) translate3d(${200 * signX}px, ${50 *
          signY}px, 0)`
        // child.style.background = `lightblue`

        console.log({
          rect,
          class: child.getAttribute('class'),
          transform: child.style.transform,
        })
      } else {
        const { top, left, bottom, right, width, height } = child.prevBox

        // Heads Up!
        //
        // Scaling changes the bounding client rect measurements.
        // Scale first so that we get measure the correct offset values later.
        const initialBox = child.getBoundingClientRect()
        const scaledBox = child.getBoundingClientRect()

        let originX = 'center'
        let translateX = 0
        if (isClose(left, scaledBox.left)) {
          originX = 'left'
        } else if (isClose(right, scaledBox.right)) {
          originX = 'right'
        } else {
          originX = 'left'
          translateX = left - scaledBox.left
        }

        let originY = 'center'
        let translateY = 0
        if (isClose(top, scaledBox.top)) {
          originY = 'top'
        } else if (isClose(bottom, scaledBox.bottom)) {
          originY = 'bottom'
        } else {
          originY = 'top'
          translateY = top - scaledBox.top
        }

        const scaleX = width / initialBox.width
        const scaleY = height / initialBox.height

        const scaleTransform = `scale3d(${scaleX}, ${scaleY}, 1)`
        const translateTransform = `translate3d(${translateX}px, ${translateY}px, 0)`

        child.style.transformOrigin = `${originX} ${originY}`
        child.style.transform = `${scaleTransform} ${translateTransform}`
        // child.style.background = `lightgreen`

        console.log({
          class: child.getAttribute('class'),
          prev: child.prevBox,
          curr: scaledBox,
          originX,
          originY,
          transform: child.style.transform,
        })
      }

      child.style.transition = ''
      child.style.transitionTimingFunction = ''

      //
      // REMOVE LAST STYLE (GOES TO FIRST)
      //
      setTimeout(() => {
        child.style.transition = `background ${DURATION_MS}ms, opacity ${DURATION_MS}ms, transform ${DURATION_MS}ms`
        child.style.transitionTimingFunction = 'cubic-bezier(.1,1,.1,1)'
        // child.style.filter = 'blur(2px)'

        setTimeout(() => {
          child.style.transform = `scale3d(1, 1, 1) translate3d(0, 0, 0)`
          child.style.opacity = 1
          // child.style.background = ``
          setTimeout(() => {
            // child.style.filter = 'blur(0)'
          }, DURATION_MS)
        })
      })
    })
  }

  renderComponent(config: RenderResultConfig<AppLayoutProps>) {
    const { classes, ElementType, unhandledProps } = config
    const { slots, template } = this.props

    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {template &&
          _.map(slots, (v, k) =>
            template.includes(k) ? (
              <div key={k} className={`${AppLayout.className}__${k}`}>
                {/*{v()}*/}
              </div>
            ) : null,
          )}
      </ElementType>
    )
  }
}

export default AppLayout
