import * as React from 'react'
import { AppLayout } from '@stardust-ui/react'

const layouts = [
  `
    "nav  header header header" 50px
    "nav  start  main   main"   auto
    "nav  start  main   main"   auto
    "nav  start  main   main" /
     70px 200px  1fr    1fr
  `,
  `
    "nav  header header header" 50px
    "nav  main   main   main"   auto
    "nav  main   main   main"   auto
    "nav  main   main   main" /
     70px 1fr    1fr    1fr
  `,
  `
    "header header header header" 50px
    "main   main   main   main"   auto
    "main   main   main   main"   auto
    "main   main   main   main" /
     70px   1fr    1fr    1fr
  `,
  `
    "header header header header" 50px
    "main   main   main   end"    auto
    "main   main   main   end"    auto
    "main   main   main   end" /
     70px   1fr    1fr    200px
  `,
  `
    "nav  header header header" 50px
    "nav  tile   main   main"   160px
    "nav  start  main   main"   auto
    "nav  start  main   main" /
     70px 200px  1fr    1fr
  `,
]

class AppLayoutExample extends React.Component {
  state = {
    layout: layouts[0],
  }

  timer

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    this.stop()
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      this.next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      this.prev()
    }
  }

  change = indexOffset => {
    const { layout } = this.state

    const next = (layouts.indexOf(layout) + indexOffset) % layouts.length

    this.setState({
      layout: layouts[next === -1 ? layouts.length - 1 : next],
    })
  }

  next = () => {
    this.change(1)
  }

  prev = () => {
    this.change(-1)
  }

  start = () => {
    this.timer = setInterval(() => this.change(1), 2000)
  }

  stop = () => {
    clearInterval(this.timer)
  }

  renderHeader = () => 'HEADER'
  renderTile = () => 'TILE'
  renderNav = () => 'NAV'
  renderFull = () => 'FULL'
  renderStart = () => 'START'
  renderMain = () => 'MAIN'
  renderEnd = () => 'END'

  render() {
    const { layout } = this.state
    return (
      <div>
        <button onClick={this.start}>Start</button>&emsp;
        <button onClick={this.stop}>Stop</button>&emsp;
        <button onClick={this.prev}>{'<-'} Prev</button>
        <button onClick={this.next}>Next {'->'}</button>&emsp; index: {layouts.indexOf(layout)}
        <hr />
        <AppLayout
          gap="0.5em"
          mode=""
          // default
          // focus
          // fullscreen

          slots={{
            header: this.renderHeader,
            nav: this.renderNav,
            full: this.renderFull,
            tile: this.renderTile,
            start: this.renderStart,
            main: this.renderMain,
            end: this.renderEnd,
          }}
          template={layout}
        />
        <pre>{layout}</pre>
      </div>
    )
  }
}

export default AppLayoutExample
