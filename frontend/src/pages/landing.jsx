import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {

  const router = useNavigate();

  return (
    <div className='landingPageContainer'>

      <nav>
        <div className='navheader'>
          <h1>Be-Gathr</h1>
        </div>
        <div className='navlist'>

          <p
            onClick={() => {
              const randomString = Math.random().toString(36).substring(2, 10);
              router(`/${randomString}`);
            }}
          >
            Join as Guest
          </p>


          <p onClick={() => {
            router("/auth")

          }} >Register</p>
          <div onClick={() => {
            router("/auth")

          }} role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className='landingMainContainer'>
        <div><h2><span style={{ color: "#FF9839" }}>Connect </span>with your Loved once</h2>

          <p>Cover a distnance by Be-Gathr</p>

          <div role='button'>
            <Link to={"/auth"}>Get Started</Link>
          </div>

        </div>

        <div>

          <img src="/main.gif" alt='' />
        </div>

      </div>


      <footer className="landingFooter">
        <p>© {new Date().getFullYear()} Be-Gathr. Vidit Paladiya </p>
      </footer>
    </div>


  );
}

export default Landing;
