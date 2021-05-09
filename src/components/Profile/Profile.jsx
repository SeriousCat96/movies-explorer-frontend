import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import './Profile.css';

function Profile() {
  return (
    <>
      <Header />
      <Main>
        <div className="profile">
          <h1 className="profile__title">Привет, Павел!</h1>

        </div>
      </Main>
    </>

  );
}

export default Profile;
