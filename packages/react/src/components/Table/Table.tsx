import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import {
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import TableRow, { TableRowProps } from './TableRow'
import { TableCellProps } from './TableCell'

import { ReactProps, ShorthandValue } from '../../types'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { tableBehavior } from '../../lib/accessibility'

export interface TableProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default tableBehavior
   * @available TableBehavior
   * */
  accessibility?: Accessibility

  /** The columns of the Table with a space-separated list of values. The values represent the track size, and the space between them represents the Table line. */
  header?: ShorthandValue

  /** The rows of the Table with a space-separated list of values. The values represent the track size, and the space between them represents the Table line. */
  rows?: ShorthandValue[]
}

export interface TableState {
  focusedRow: number
  focusedCol: number
}

/**
 * A Table is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Table extends UIComponent<ReactProps<TableProps>, any> {
  public static displayName = 'Table'
  public static className = 'ui-Table'

  private rowsCount: number
  private columsCount: number

  actionHandlers: AccessibilityActionHandlers = {
    moveNextColumn: e => {
      e.preventDefault()
      const nextIndex =
        this.state.focusedCol + 1 >= this.columsCount
          ? this.state.focusedCol
          : this.state.focusedCol + 1

      this.setState({
        focusedCol: nextIndex,
      })
    },
    movePreviousColumn: e => {
      e.preventDefault()
      const nextIndex = this.state.focusedCol - 1 < 0 ? 0 : this.state.focusedCol - 1

      this.setState({
        focusedCol: nextIndex,
      })
    },
    moveNextRow: e => {
      e.preventDefault()
      const nextIndex =
        this.state.focusedRow + 1 >= this.rowsCount
          ? this.state.focusedRow
          : this.state.focusedRow + 1

      this.setState({
        focusedRow: nextIndex,
      })
    },
    movePreviousRow: e => {
      e.preventDefault()
      const nextIndex = this.state.focusedRow - 1 < 0 ? 0 : this.state.focusedRow - 1

      this.setState({
        focusedRow: nextIndex,
      })
    },
  }

  public static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.nodeContent),
        customPropTypes.nodeContent,
      ]),
    ]),
    header: customPropTypes.itemShorthand,
    rows: customPropTypes.collectionShorthand,
  }

  public static defaultProps: TableProps = {
    as: 'table',
    accessibility: tableBehavior,
  }

  constructor(p, c) {
    super(p, c)

    this.state = {
      focusedRow: -1,
      focusedCol: -1,
    }
    const { rows, header } = this.props
    this.rowsCount = rows.length + (header ? 1 : 0)
    this.columsCount = header && (header as TableRowProps).items.length
  }

  public renderRows() {
    const { rows } = this.props
    const { focusedRow } = this.state

    return _.map(rows, (row: TableRowProps, index) => {
      const props = {
        ...row,
        focusedIndex: focusedRow - 1 === index ? this.state.focusedCol : -1,
      } as TableRowProps
      return <TableRow {...props} />
    })
  }

  public renderHeader() {
    const header = this.props.header as TableRowProps
    const { items } = header

    console.log('header', items)

    const headers = _.map(items, (item: TableCellProps) => {
      return {
        as: 'th',
        scope: 'col',
        ...item,
      }
    })

    console.log('headers cells', headers)

    const headerRowProps = {
      ...header,
      items: headers,
      focusedIndex: this.state.focusedRow === 0 ? this.state.focusedCol : -1,
    } as TableRowProps

    return <TableRow {...headerRowProps} />
  }

  public renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...unhandledProps}
      >
        <thead>
          {/* <TableRow {...this.getHeaderProps()} /> */}
          {this.renderHeader()}
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </ElementType>
    )
  }
}

export default Table
