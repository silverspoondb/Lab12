import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import FireRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue' 
import FirebaseSignin from '../views/FirebaseSignin.vue';
import WeatherView from '../views/WeatherView.vue';
import CountBookAPI from '@/views/CountBookAPI.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/denied', name: 'Denied', component: AccessDeniedView },
  { path: '/FireRegister', name: 'Fireregister', component: FireRegisterView },
  { path: '/signin', name: 'Signin', component: FirebaseSignin },
  { path:'/addbook', name:'Addbook', component: AddBookView},
  { path:'/WeatherCheck', name:'WeatherCheck', component: WeatherView},
  { path:'/CountBookAPI', name:'CountBookAPI', component: CountBookAPI},
  { path:'/GetAllBookAPI', name:'GetAllBookAPI', component: () => import('../views/GetAllBookAPI.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// navigation guard to check authentication
import { getAuth } from 'firebase/auth';
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  if (to.meta.requiresAuth && !auth.currentUser) {
    next('/denied');
  } else {
    next();
  }
});

export default router