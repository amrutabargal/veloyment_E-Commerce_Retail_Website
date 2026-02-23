import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider } from './context/AppContext';
import { RealTimeProvider } from './context/RealTimeContext';

export default function App() {
  return (
    <AppProvider>
      <RealTimeProvider>
        <RouterProvider router={router} />
      </RealTimeProvider>
    </AppProvider>
  );
}
