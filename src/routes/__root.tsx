import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { Home, Calculator, BarChart3, TrendingUp, Brain } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-blue-50/50 to-primary/5 dark:from-background dark:via-background dark:to-primary/5 transition-colors duration-300'>
      <nav className='border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:shadow-none transition-colors duration-300'>
        <div className='container mx-auto px-4 sm:px-6 py-3 sm:py-4'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0'>
            <Link to='/' className='flex items-center gap-2 sm:gap-3 group'>
              <div className='p-1.5 sm:p-2 bg-primary rounded-lg group-hover:bg-primary/90 transition-colors duration-200'>
                <Home className='h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground' />
              </div>
              <div>
                <h1 className='text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200'>
                  AI Real Estate Estimator
                </h1>
                <p className='text-xs text-muted-foreground hidden sm:block'>
                  Belgian Property Intelligence
                </p>
              </div>
            </Link>

            <div className='flex items-center gap-1 flex-wrap w-full sm:w-auto'>
              <NavLink to='/' icon={Calculator} label='Estimator' />
              <NavLink to='/neural-network' icon={Brain} label='Neural Net' />
              <NavLink to='/algorithms' icon={BarChart3} label='Algorithms' />
              <NavLink to='/insights' icon={TrendingUp} label='Insights' />
              <div className='ml-2 hidden sm:block'>
                <ThemeToggle />
              </div>
            </div>
          </div>
          <div className='sm:hidden flex justify-end mt-2'>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className='container mx-auto px-4 sm:px-6 py-6 sm:py-8'>
        <Outlet />
      </main>

      <footer className='border-t bg-background/80 backdrop-blur-md mt-16 transition-colors duration-300'>
        <div className='container mx-auto px-6 py-6'>
          <p className='text-center text-sm text-muted-foreground'>
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
      className='flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 [&.active]:bg-primary/10 [&.active]:text-primary [&.active]:font-semibold dark:[&.active]:bg-primary/20'
      activeProps={{
        className: 'bg-primary/10 text-primary font-semibold dark:bg-primary/20',
      }}
    >
      <Icon className='h-4 w-4' />
      <span className='text-xs sm:text-sm'>{label}</span>
    </Link>
  );
}
