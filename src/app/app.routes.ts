import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layouts/private.layout').then(m => m.PrivateLayout),
    children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'events', loadComponent: () => import('./features/events/events.page').then(m => m.EventsPage) },
      { path: 'events/new', loadComponent: () => import('./features/events/new-event.page').then(m => m.NewEventPage) },
      { path: 'check-in', loadComponent: () => import('./features/check-in/check-in.page').then(m => m.CheckInPage) },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./core/layouts/public.layout').then(m => m.PublicLayout),
    children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./features/home/home.page').then(m => m.HomePage) },
      { path: 'login', loadComponent: () => import('./features/auth/auth.page').then(m => m.AuthPage) },
      { path: 'register', loadComponent: () => import('./features/auth/auth.page').then(m => m.AuthPage) },
      { path: 'events/:slug', loadComponent: () => import('./features/events/event-detail.page').then(m => m.EventDetailPage) },
      { path: '**', loadComponent: () => import('./shared/ui/not-found.page').then(m => m.NotFoundPage) },
    ],
  },
];
