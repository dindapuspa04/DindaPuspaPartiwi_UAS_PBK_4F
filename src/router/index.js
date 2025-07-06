import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // Import store

// Import Views
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import QuestionList from '../views/QuestionList.vue';
import QuestionForm from '../views/QuestionForm.vue';
import CoursesView from '../views/CoursesView.vue';
import TeachersView from '../views/TeachersView.vue';
import AssignmentsView from '../views/AssignmentsView.vue';
import ResultsView from '../views/ResultsView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    redirect: '/dashboard', // Redirect root to dashboard after login
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/questions',
    name: 'QuestionList',
    component: QuestionList,
    meta: { requiresAuth: true }
  },
  {
    path: '/questions/add',
    name: 'AddQuestion',
    component: QuestionForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/questions/edit/:id',
    name: 'EditQuestion',
    component: QuestionForm,
    props: true, // Allows component to receive 'id' as a prop
    meta: { requiresAuth: true }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: TeachersView,
    meta: { requiresAuth: true }
  },
  
  {
    path: '/assignments',
    name: 'Assignments',
    component: AssignmentsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/results',
    name: 'Results',
    component: ResultsView,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard (middleware)
router.beforeEach((to, from, next) => {
  // PENTING: Panggil useAuthStore() di DALAM fungsi beforeEach
  const authStore = useAuthStore(); 

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;