After installing the app use 'npm run dev' to run it. (not 'npm start').

The app will launch on http://localhost:3000

Implementation Notes:

* Used create-react-app to get something running fast. (https://github.com/facebookincubator/create-react-app)
* Decided there is no need for a state management library like Redux at this point.
* I'm using a dependency called 'concurrently' to start both the create-react-app server and also a second server.  
  The second server is configured to proxy the atm API requests through (as many of the urls gives CORS errors).
  I didn't want to eject the create-react-app purely just to do this.

Time Taken:

* 3 hours to get it all working.
* Then as much time as I liked to clean up the code fully, add a some tests and fix the local CORS issue.

TODO's:

* Research CSS naming conventions further ie BEM. (At the moment is using hyphen delimited strings)
* Continue to improve test coverage
* use CSS Modules (I would like to be able to do this without ejecting
  https://medium.com/@kitze/configure-create-react-app-without-ejecting-d8450e96196a)
* Research into using Git Hooks to run tests before committing (https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks)
