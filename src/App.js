import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import './assets/css/main.scss'

import ToyIndex from './views/toy-index'
import AppHeader from './cmps/app-header'
import Dashboard from './views/dashboard.jsx'
import AboutUs from './views/about-us.jsx'
import ToyDetails from './views/toy-details.jsx'
import AddToy from './views/add-toy.jsx'
import UserMsg from './cmps/user-msg.jsx'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              {/* <Route element={<HomePage />} path="/" /> */}
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<AddToy />} path="/toy/add/" />
              <Route element={<AddToy />} path="/toy/add/:toyId" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<AboutUs />} path="/about-us" />
            </Routes>
          </main>
          <UserMsg />
        </section>
      </Router>
    </Provider>
  )
}

export default App
