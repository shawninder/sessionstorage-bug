import { connect } from 'react-redux'

function App (props) {
  return (
    <div>
      <p>showNotice: {props.app.showNotice ? 'true' : 'false'}</p>
      <button onClick={(event) => {
        props.dispatch({ type: 'App:toggleNotice' })
      }}>toggle</button>
      <div
        className='notice'
        style={{
          opacity: props.app.showNotice ? 1 : 0,
          transform: props.app.showNotice ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        Notice!
      </div>
      <style jsx>{`
        .notice {
          width: 100px;
          transition-property: opacity, transform;
          transition-duration: 0.4s;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { app } = state
  return { app }
}

export default connect(mapStateToProps)(App)
