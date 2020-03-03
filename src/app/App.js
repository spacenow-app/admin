import React from 'react'
import { SpacenowAuthorization, SpacenowLayout, SpacenowTheme } from '@spacenow'
import Provider from 'react-redux/es/components/Provider'
import { Router } from 'react-router-dom'
import jssExtend from 'jss-extend'
import history from '@history'
import { Auth } from './auth'
import store from './store'
import AppContext from './AppContext'
import routes from './spacenow-configs/routesConfig'
import { create } from 'jss'
import { StylesProvider, jssPreset, createGenerateClassName } from '@material-ui/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point')
})

const generateClassName = createGenerateClassName()

const App = () => {
  return (
    <AppContext.Provider
      value={{
        routes
      }}
    >
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Auth>
            <Router history={history}>
              <SpacenowAuthorization>
                <SpacenowTheme>
                  <ToastContainer hideProgressBar />
                  <SpacenowLayout />
                </SpacenowTheme>
              </SpacenowAuthorization>
            </Router>
          </Auth>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  )
}

export default App
