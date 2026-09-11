// Central allowlist of destinations the 404 page can navigate to.
// This portfolio is a single-page app (Home, About, Projects, Contact are
// in-page anchor sections, not separate routes), so the "real routes"
// are the anchors already used by Navbar.jsx and App.jsx.
//
// Keep this in sync with the section ids in App.jsx and the links array
// in Navbar.jsx. Nothing outside this map is ever navigated to.
export const NOT_FOUND_ROUTES = {
  home: { label: 'Home', path: '/' },
  projects: { label: 'Projects', path: '/#projects' },
  about: { label: 'About', path: '/#about' },
  contact: { label: 'Contact', path: '/#contact' },
}
