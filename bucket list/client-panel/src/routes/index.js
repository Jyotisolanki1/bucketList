import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AdminRoutes from './AdminRoutes';
import Loadable from 'ui-component/Loadable';
import { motion } from 'framer-motion';
import Layout from '../views/pages/landing/index';
import Home from 'views/pages/landing/landing';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const SignupPage = Loadable(lazy(() => import('views/Client/addClient')));
const CMS = Loadable(lazy(() => import('views/CMS/aboutus')));
const Helpcenter = Loadable(lazy(() => import('views/HelpCenter/index')));

const LoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));

export default function ThemeRoutes() {
    const { isClientLoggedIn: reduxisClientLoggedIn } = useSelector((state) => state.admin);
    const localStorageisClientLoggedIn = localStorage.getItem('isClientLoggedIn') === 'true';

    const isClientLoggedIn = reduxisClientLoggedIn || localStorageisClientLoggedIn;

    const routes = isClientLoggedIn
        ? [AdminRoutes] // Wrap AdminRoutes in an array
        : [
              {
                  path: '/',
                  element: (
                      <Layout>
                          <Home />
                      </Layout>
                  )
              },
              {
                  path: '/signup',
                  element: (
                      <Layout>
                          <SignupPage />
                      </Layout>
                  )
              },
              {
                  path: '/aboutus',
                  element: (
                      <Layout>
                          <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                          >
                              <CMS />
                          </motion.div>
                      </Layout>
                  )
              },
              {
                  path: '/termsandcondition',
                  element: (
                      <Layout>
                          <CMS />
                      </Layout>
                  )
              },
              {
                  path: '/privacypolicy',
                  element: (
                      <Layout>
                          <CMS />
                      </Layout>
                  )
              },
              {
                  path: '/helpcenter',
                  element: (
                      <Layout>
                          <Helpcenter />
                      </Layout>
                  )
              },
              LoginRoutes
          ];

    return useRoutes(routes.flat()); // Flatten the array to avoid nested arrays
}
