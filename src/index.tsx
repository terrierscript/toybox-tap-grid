import React from "react"
import { render } from "react-dom"
import styled, { css } from "styled-components"
import { useSwipeable } from "react-swipeable"
const Variables = styled.div`
  --num: 5;
  --bg: #c0c0c0;
`
const Grid = styled.div`
  display: grid;
  grid-template-rows: calc(100vh / var(--num));
`

const Item = styled.div`
  ${({ row, col }) => css`
    grid-row: ${row};
    grid-columns: ${col};
  `}
`

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background: var(--bg);
`

const SuspendSwipe = (props) => {
  const handlers = useSwipeable({
    onSwiped: (e) => {
      console.log(e)
      // @ts-ignore
      e.preventDefault()
    },
    trackTouch: true,
    trackMouse: true,
    preventDefaultTouchmoveEvent: true
  })
  // console.log(handlers)
  return <Container {...handlers} {...props} />
}
const App = () => {
  return (
    <SuspendSwipe>
      <Variables>
        <Grid>
          <Item />
        </Grid>
      </Variables>
    </SuspendSwipe>
  )
}

render(<App />, document.querySelector("#root"))
