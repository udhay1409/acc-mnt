
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (user?.role === 'super_admin') {
        navigate('/superadmin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate, isAuthenticated, user, isLoading]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bizblue-50">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-bizblue-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Loading BizSuite...</h1>
      </div>
    </div>
  );
};

export default Index;
