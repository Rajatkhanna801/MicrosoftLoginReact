import React, { useEffect } from 'react';

const MicrosoftAuthComponent = () => {
  useEffect(() => {
    const handleMicrosoftRedirect = async () => {
      // Get the authorization code from the URL parameters
      const urlSearchParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlSearchParams.get('code');

      if (authorizationCode) {
        try {
          // Make a POST request to exchange the authorization code for an access token
          const tokenResponse = await fetch('http://localhost:8000/auth/handle_login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `code=${authorizationCode}&client_id=0d91961b-e5af-43d6-824f-bfd70589f7c8&grant_type=authorization_code`,
          });

          const tokenData = await tokenResponse.json();

          // Handle the received access token as needed
          console.log('Access Token:', tokenData.access_token);
        } catch (error) {
          console.error('Error during token exchange:', error);
        }
      }
    };

    // Check if the URL contains the authorization code
    if (window.location.search.includes('code=')) {
      handleMicrosoftRedirect();
    }
  }, []);

  const handleLoginClick = () => {
    // Construct the Microsoft login URL
    const loginUrl = `https://login.microsoftonline.com/060c4fd3-c9c8-44be-a479-5c51c4a3d2e2/oauth2/v2.0/authorize?client_id=0d91961b-e5af-43d6-824f-bfd70589f7c8&redirect_uri=${encodeURIComponent('http://localhost:8000/auth/handle_login/')}&response_type=code&scope=openid%20profile%20User.Read`;

    // Redirect the user to the Microsoft login page
    window.location.href = loginUrl;
  };

  return (
    <div>
      <h1>Microsoft Login Example</h1>
      <button onClick={handleLoginClick}>Login with Microsoft</button>
    </div>
  );
};

export default MicrosoftAuthComponent;
