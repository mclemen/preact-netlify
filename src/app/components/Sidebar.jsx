import LinkWithStatus from './LinkWithStatus'


import { Github } from './icons'

export default ({ state }) => (
  <aside class="sidebar">
    <div class="menu">
      <header role="banner" id="banner">
        <h1>Mobile Gods</h1>
        <p>Mobile Gods Pro Builds</p>
      </header>
      {/* <nav role="navigation">
        <LinkWithStatus state={state} to="/">Home</LinkWithStatus> */}
      {/* <LinkWithStatus state={state} to="/project">The project</LinkWithStatus> */}
      {/* <LinkWithStatus state={state} to="/starter">Quick start </LinkWithStatus> */}
      {/* <LinkWithStatus state={state} to="/counter">Counter</LinkWithStatus> */}
      {/* <LinkWithStatus state={state} to="/heros">Heros</LinkWithStatus> */}
      {/* <LinkWithStatus state={state} to="/apod">APOD</LinkWithStatus> */}
      {/* </nav> */}
      <nav role="navigation">
        <div class="container">

          <input type="checkbox" id="navbar-burger-toggle" class="navbar-burger-toggle is-hidden" />
          <label for="navbar-burger-toggle" class="navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </label>

          <div class="navbar-menu">
            <div >
              <LinkWithStatus state={state} to="/">Home</LinkWithStatus>
              <LinkWithStatus state={state} to="/project">The project</LinkWithStatus>
              <LinkWithStatus state={state} to="/starter">Quick start </LinkWithStatus>
              <LinkWithStatus state={state} to="/counter">Counter</LinkWithStatus>
              <LinkWithStatus state={state} to="/heros">Heros</LinkWithStatus>
              <LinkWithStatus state={state} to="/apod">APOD</LinkWithStatus>
            </div>
          </div>
        </div>
      </nav>




      <footer>
        {/* <a href="https://github.com/loteoo/hyperstatic" target="_blank" rel="noopener noreferrer">Hyperstatic Github <Github /></a>
        <a href="https://github.com/loteoo/hyperstatic-demo" target="_blank" rel="noopener noreferrer">Demo site source code <Github /></a> */}
      </footer>
    </div>
  </aside>
)
