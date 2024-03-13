import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import kc, { initializeKeycloak } from './keycloak'; // Antag att detta är korrekt konfigurerat och exporteras

function Login() {
  const [infoMessage, setInfoMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const { authenticated } = await initializeKeycloak();
        if (authenticated) {
          navigate('/home'); // Omdirigera till hem om redan inloggad
        }
        // Om inte authenticated, kommer Keycloak själv hantera omdirigering till inloggningssidan baserat på dina initieringsinställningar
      } catch (error) {
        console.error("Keycloak initialization error:", error);
      }
    };

    init();
  }, [navigate]);

  const showAccessToken = () => {
    setInfoMessage(kc.token || "No access token available");
  };

  const showParsedAccessToken = () => {
    setInfoMessage(JSON.stringify(kc.tokenParsed) || "No parsed access token available");
  };

  const checkTokenExpired = () => {
    // `isTokenExpired` kan returnera `undefined` om det inte finns något token; hantera detta scenario
    const isExpired = kc.isTokenExpired() ? "Yes" : "No";
    setInfoMessage(`Token Expired: ${isExpired}`);
  };

  const refreshToken = () => {
    kc.updateToken(5) // Argumentet är minThreshold i sekunder
      .then(refreshed => {
        setInfoMessage(`Token Refreshed: ${refreshed}`);
      })
      .catch(err => {
        console.error('Token Refresh Failed:', err);
        setInfoMessage('Token Refresh Failed');
      });
  };

  const logout = () => {
    kc.logout({ redirectUri: window.location.origin }).catch(err => {
      console.error('Logout failed:', err);
    });
  };

  const navigateHome = () => {
    navigate('/home');
  };

  return (
    <div className="Login">
      <div className='grid'>
        <div className='col-12'>
          <h1>My Secured React App</h1>
        </div>
      </div>
      <div className='grid'>
        <div className='col-12'>
          <Button label="Show Access Token" onClick={showAccessToken} />
          <Button label="Show Parsed Access Token" onClick={showParsedAccessToken} />
          <Button label="Check Token Expiry" onClick={checkTokenExpired} />
          <Button label="Refresh Token" onClick={refreshToken} />
          <Button label="Logout" onClick={logout} className="p-button-danger" />
          <Button label="Navigate Home" onClick={navigateHome} />
        </div>
        <div className='col-12'>
          <Card>
            <p style={{ wordBreak: 'break-all' }}>
              {infoMessage}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
