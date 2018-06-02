After installing the app use 'npm run dev' to run it. (NOT 'npm start').

The app will launch on http://localhost:3000

Implementation Notes:

* Used create-react-app to get something running fast. (https://github.com/facebookincubator/create-react-app)
* Decided there is no need for a state management library like Redux at this point.

Time Taken:

* 3 hours to get it all working.
* Then as much time as I liked to clean up the code fully, add tests, fix the local CORS issue.

TODO's:

* use CSS Modules (I would like to be able to do this without ejecting
  https://medium.com/@kitze/configure-create-react-app-without-ejecting-d8450e96196a)

---

add tests

work on router more so can clean up?
const { geolocation, atms, error } = this.state;
let name = '';
if (this.props.location && this.props.location.state) {
name = this.props.location.state.name;
}
