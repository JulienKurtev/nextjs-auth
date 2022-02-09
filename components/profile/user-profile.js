//import { useSession } from 'next-auth/react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     window.location.href = '/auth';
  //   }
  // });

  // if(status === 'loading') {
  //   return <p>Loading</p>;
  // }

  async function changePassword(passwordData){
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePassword}/>
    </section>
  );
}

export default UserProfile;
