import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const {data: session , status} = useSession();

  console.log(session);
  console.log(status);
 
  function logout() {
    signOut();
  }

  const authNav = [
    <li key='nav1'>
      <Link href='/profile'>Profile</Link>
    </li>,
    <li key='nav2'>
        <button onClick={logout}>Logout</button>
    </li>
  ];

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {status !== 'authenticated' && <li>
            <Link href='/auth'>Login</Link>
          </li>}
          
          {status === 'authenticated' && authNav}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
