import { useRef } from 'react/cjs/react.development';
import classes from './profile-form.module.css';

function ProfileForm(props) {
  const newPassRef = useRef();
  const oldPassRef = useRef();
  function submit(e) {
    e.preventDefault();

    const newPass = newPassRef.current.value;
    const oldPass = oldPassRef.current.value;

    props.onChangePassword({ oldPassword: oldPass, newPassword: newPass});
  }

  return (
    <form className={classes.form} onSubmit={submit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPassRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
