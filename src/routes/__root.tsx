import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import {
  Home,
  Calculator,
  BarChart3,
  TrendingUp,
  Info,
  Brain,
} from 'lucide-react';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <nav className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='flex items-center gap-3 group'>
              <div className='p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors'>
                <Home className='h-6 w-6 text-white' />
              </div>
              <div>
                <h1 className='text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>
                  AI Real Estate Estimator
                </h1>
                <p className='text-xs text-gray-600'>
                  Belgian Property Intelligence
                </p>
              </div>
            </Link>

            <div className='flex items-center gap-1'>
              <NavLink to='/' icon={Calculator} label='Estimator' />
              <NavLink to='/neural-network' icon={Brain} label='Neural Net' />
              <NavLink to='/algorithms' icon={BarChart3} label='Algorithms' />
              <NavLink to='/insights' icon={TrendingUp} label='Insights' />
              <NavLink to='/methodology' icon={Info} label='About' />
            </div>
          </div>
        </div>
      </nav>

      <main className='container mx-auto px-6 py-8'>
        <Outlet />
      </main>

      <footer className='border-t bg-white/80 backdrop-blur-md mt-16'>
        <div className='container mx-auto px-6 py-6'>
          <p className='text-center text-sm text-gray-600'>
            © 2025 AI Real Estate Estimator. Built with React 19, TanStack
            Router & Query.
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      to={to}
      className='flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 [&.active]:bg-blue-100 [&.active]:text-blue-700 [&.active]:font-semibold'
      activeProps={{
        className: 'bg-blue-100 text-blue-700 font-semibold',
      }}
    >
      <Icon className='h-4 w-4' />
      <span className='text-sm'>{label}</span>
    </Link>
  );
}
