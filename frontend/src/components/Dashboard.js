import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('user_role');
    console.log('userRole:', userRole);

    if (!userRole) {
      console.log('User role not found. Navigating to /login');
      navigate('/login');
    } else {
      switch (userRole) {
        case 'admin':
          console.log('Navigating to /admin');
          navigate('/admin');
          break;
        case 'normalEmployee':
          console.log('Navigating to /normalemployee');
          navigate('/normalemployee');
          break;
        case 'procurementManager':
          console.log('Navigating to /procurement');
          navigate('/procurement');
          break;
        default:
          console.log('Unknown user role. Navigating to /login');
          navigate('/login');
      }
    }
  }, [navigate]);

  return null;
}

export default Dashboard;