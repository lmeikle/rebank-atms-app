
After installing the app type 'npm run dev' to run it. (NOT 'npm start')
The app will launch on http://localhost:3000

Implementation Notes:
	- Used create-react-app to get something running fast. (https://github.com/facebookincubator/create-react-app)
	- Decided to implement the bonus points task from the offset so that I could have 2 pages/components.
	  I thought having more than one would demonstrate my structure better.
	- Decided there is no need for a state management library like Redux at this point.
	
Time Taken:
	-3 hours to get it all working
	-Then as much time as I liked to:
		-clean up the code fully
		-add tests
		-fix the CORS issue - many of the bank API Urls give a CORS error, 
		 so I setup another local server to proxy the requests through. (I didn't want to eject the create-react-app)

TODO's:
	-think about whether we want to update the results if the geolocation changes (maybe a refresh button)
	-use CSS Modules (would like to be able to do this without ejecting
	 https://medium.com/@kitze/configure-create-react-app-without-ejecting-d8450e96196a)
	 
	 
Finish off:
add tests
work on router more so can clean up?
format it all nicely and consistently