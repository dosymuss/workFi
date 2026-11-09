import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"

import './index.css'

import App from './App.jsx'
import AuthOutlet from './pageOutlet/authOutlet/AuthOutlet.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import EmailConfirmPage from './pages/auth/EmailConfirmPage.jsx'
import OtpPage from './pages/auth/OtpPage.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'
import CreatePassPage from './pages/auth/CreatePassPage.jsx'
import HomePage from './pages/main/HomePage.jsx'
import LikePage from './pages/main/LikePage.jsx'
import ClientProfile from './pages/profile/ClientProfile.jsx'
import SearchPage from './pages/main/SearchPage.jsx'
import VacansyPage from './pages/main/VacansyPage.jsx'
import VacansyHistoryPage from './pages/vacansyHistory/VacansyHistoryPage.jsx'
import Test from './pages/test/Test.jsx'
import CompanyProfile from './pages/profile/CompanyProfile.jsx'
import CreateVacansy from './pages/profile/CreateVacansy.jsx'
import EditProfile from './pages/editProfile/EditProfile.jsx'
import ClientProfileWatch from './pages/profile/ClientProfileWatch.jsx'
import CompanyVacansies from './pages/companyVacansies/CompanyVacansies.jsx'

import { store } from './store/index.js'
import CompanyProfileWatch from './pages/profile/CompanyProfileWatch.jsx'
import EditVacansy from './pages/EditVacansy/EditVacansy.jsx'



const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthOutlet />,
    children: [
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "confirm-email",
        element: <EmailConfirmPage />
      },
      {
        path: "otp",
        element: <OtpPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "create-password",
        element: <CreatePassPage />
      }
    ]
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/liked",
        element: <LikePage />
      },
      {
        path: "/client-profile",
        element: <ClientProfile />
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/vacansy/:id",
        element: <VacansyPage />
      },
      {
        path: "/vacansy-history",
        element: <VacansyHistoryPage />
      },
      {
        path: "/test",
        element: <Test />
      },
      {
        path: "/company-profile",
        element: <CompanyProfile />
      },
      {
        path: "/company/:id",
        element: <CompanyProfileWatch />
      },
      {
        path: "/create-vacansy",
        element: <CreateVacansy />
      },
      {
        path: "/edit-vacansy/:id",
        element: <EditVacansy />
      },
      {
        path: "/edit-profile",
        element: <EditProfile />
      },
      {
        path: "/profile-watch/:id",
        element: <ClientProfileWatch />
      },
      {
        path: "/company-vacansy",
        element: <CompanyVacansies />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
