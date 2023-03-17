import React from 'react'

import { Refine, AuthProvider } from '@pankod/refine-core'
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-mui'
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from '@mui/icons-material'

import dataProvider from '@pankod/refine-simple-rest'
import routerProvider from '@pankod/refine-react-router-v6'
import axios, { AxiosRequestConfig } from 'axios'
import { ColorModeContextProvider } from 'Contexts/Index'
import { Title, Sider, Layout, Header } from 'Components/Layout/Index'
import { CredentialResponse } from 'Interfaces/google'
import { parseJwt } from 'Utilities/parse-jwt'

import {
  Agents,
  AgentProfile,
  AllProperties,
  CreateProperty,
  EditProperty,
  Home,
  Login,
  MyProfile,
  PropertyDetails,
} from 'Views/Index'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    }
  }

  return request
})

function App() {
  const authProvider: AuthProvider = {
    login: ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null

      if (profileObj) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          }),
        )
      }

      localStorage.setItem('token', `${credential}`)

      return Promise.resolve()
    },
    logout: () => {
      const token = localStorage.getItem('token')

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        axios.defaults.headers.common = {}
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve()
        })
      }

      return Promise.resolve()
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem('token')

      if (token) {
        return Promise.resolve()
      }
      return Promise.reject()
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem('user')
      if (user) {
        return Promise.resolve(JSON.parse(user))
      }
    },
  }

  return (
    <>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider('')}
            // notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
              {
                name: 'Properties',
                list: AllProperties,
                show: PropertyDetails,
                create: CreateProperty,
                edit: EditProperty,
                icon: <VillaOutlined />,
              },
              {
                name: 'Agents',
                list: Agents,
                show: AgentProfile,
                icon: <PeopleAltOutlined />,
              },
              {
                name: 'Reviews',
                list: Home,
                icon: <StarOutlineRounded />,
              },
              {
                name: 'Messages',
                list: Home,
                icon: <ChatBubbleOutline />,
              },
              {
                name: 'MyProfile',
                options: { label: 'My Profile ' },
                list: MyProfile,
                icon: <AccountCircleOutlined />,
              },
            ]}
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            routerProvider={routerProvider}
            authProvider={authProvider}
            LoginPage={Login}
            DashboardPage={Home}
          />
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </>
  )
}

export default App
