import AppRouter from './router/router';
import AnimatedToast from '@/components/common/Toast/AnimatedToast';
import { useSupabase } from './hooks/useSupabase';

function App() {
  useSupabase();

  return (
    <>
      <AppRouter />
      <AnimatedToast />
    </>
  );
}

export default App;
