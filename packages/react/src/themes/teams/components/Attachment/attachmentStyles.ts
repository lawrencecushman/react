import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from './attachmentVariables'
import { pxToRem } from '../../../../lib'
import Icon from '../../../../components/Icon/Icon'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const attachmentStyles: ComponentSlotStylesInput<AttachmentProps, AttachmentVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: pxToRem(440),
    minHeight: pxToRem(48),
    padding: v.padding,
    marginBottom: pxToRem(2),
    marginRight: pxToRem(2),
    background: v.backgroundColor,
    color: v.textColor,
    boxShadow: v.boxShadow,
    border: `${siteVariables.borderWidth} solid ${v.borderColor}`,
    borderRadius: v.borderRadius,

    ...getBorderFocusStyles({
      siteVariables,
      isFromKeyboard: p.isFromKeyboard,
      borderRadius: v.borderRadius,
    }),

    ...((p.actionable || p.onClick) && {
      cursor: 'pointer',

      ':hover': {
        background: v.backgroundColorHover,
        color: v.textColorHover,
      },
    }),
  }),

  content: (): ICSSInJSStyle => ({
    flex: 1,
  }),

  header: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.headerFontSize,
    fontWeight: v.headerFontWeight,
    lineHeight: v.headerLineHeight,
  }),

  description: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    opacity: 0.5,
    fontSize: v.descriptionFontSize,
    fontWeight: v.descriptionFontWeight,
    lineHeight: v.descriptionLineHeight,
  }),

  icon: ({ variables: v }): ICSSInJSStyle => ({
    flex: '0 0 auto',
    marginRight: v.iconSpace,
  }),

  action: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const iconFilledStyles = getIconFillOrOutlineStyles({ outline: false })

    return {
      [`& .${Icon.className}`]: {
        color: v.textColor, // this breaks the color change on hover
      },

      ...getIconFillOrOutlineStyles({ outline: true }),

      ':hover': iconFilledStyles,

      ':focus': {
        ...(p.isFromKeyboard && iconFilledStyles),
        ...getBorderFocusStyles({
          siteVariables,
          isFromKeyboard: p.isFromKeyboard,
          borderRadius: v.borderRadius,
        })[':focus'],
      },
    }
  },

  progress: ({ props: p, variables: v }): ICSSInJSStyle => ({
    transition: 'width 0.2s',
    position: 'absolute',
    display: 'block',
    bottom: 0,
    left: 0,
    width: `${p.progress}%`,
    maxWidth: '100%',
    height: pxToRem(v.progressHeight),
    background: v.progressColor,
  }),
}

export default attachmentStyles
