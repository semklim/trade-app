import { Button } from '@/components/ui/button';
import { roles } from '@/constants/roles';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    // In a real app, you would handle role selection with Redux
    localStorage.setItem('selectedRole', role);
    navigate('/transactions');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Select Your Role</h1>
      <div className="space-y-4 w-full max-w-md">
        {roles.map((role) => (
          <Button
            key={role}
            className="w-full"
            onClick={() => handleRoleSelect(role)}
          >
            {role}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
