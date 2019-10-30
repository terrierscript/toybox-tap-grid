import React, { useState } from "react"
import { render } from "react-dom"
import styled, { css } from "styled-components"
import { useSwipeable } from "react-swipeable"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
  }
`
const randomColor = () => `hsl(${Math.floor(Math.random() * 360)},99%,50%)`
const NUM = 5
const Variables = styled.div`
  --num: ${NUM};
  --bg: #f0f0f0;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--num), 1fr);
  /* calc(100vh / var(--num))); */
  grid-template-rows: repeat(var(--num), 17vh);
  /* calc(100vw / var(--num))); */
  grid-gap: 1em;
`

const Cell = styled.div`
  width: 100%;
  height: 100%;
  background: var(--bg);
  /* width: calc(100vh / var(--num)); */
  /* height: calc(100vw / var(--num)); */
  ${({ row, col }) => css`
    grid-column: ${col};
    grid-row: ${row};
  `}
`

const Item = styled(Cell)`
  transition: 0.2s;
  ${({ color }) => css`
    background: ${color};
  `};
`

const Container = styled.div`
  width: 100vw;
  height: 100%;
  /* background: var(--bg); */
  overflow: hidden;
`

const SuspendSwipe = (props) => {
  const handlers = useSwipeable({
    onSwiped: (e) => {
      e.event.preventDefault()
    },
    trackTouch: true,
    trackMouse: true,
    preventDefaultTouchmoveEvent: true
  })

  // console.log(handlers)
  return (
    <Container
      {...handlers}
      {...props}
      onTouchMove={(e) => e.preventDefault()}
    />
  )
}

const TapCell = ({ col, row }) => {
  const [color, setColor] = useState<string | undefined>(undefined)
  const touchEvent = (e) => {
    // if (color) {
    //   return
    // }
    setColor(randomColor())
    setTimeout(() => {
      setColor(undefined)
    }, 3000)
  }

  return (
    <Item
      onTouchStart={touchEvent}
      // onMouseOver={touchEvent}
      col={col}
      row={row}
      color={color}
    ></Item>
  )
}
const GridArea = () => {
  return (
    <Grid>
      {Array(NUM)
        .fill(null)
        .map((_, col) =>
          Array(NUM)
            .fill(null)
            .map((_, row) => {
              return (
                <TapCell key={`${row}_${col}`} col={col + 1} row={row + 1} />
              )
            })
        )
        .flat()}
    </Grid>
  )
}
const App = () => {
  return (
    <SuspendSwipe>
      <GlobalStyle></GlobalStyle>
      <Variables>
        <GridArea />
      </Variables>
    </SuspendSwipe>
  )
}

render(<App />, document.querySelector("#root"))
