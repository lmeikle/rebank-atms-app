
After installing the app type 'npm start' to run it.
The app will launch on http://localhost:3000

Implementation Notes:
	- Used create-react-app to get something running fast. (https://github.com/facebookincubator/create-react-app)
	- Decided to implement the bonus points task from the offset so that I could have 2 pages/components.
	  I thought having more than one would demonstrate my structure better.
	- Decided there is no need for a state management library like Redux at this point.
	
Issues:
	 - Many of the bank API Urls give a CORS error, so I did a quick temporary work around in AtmsContainer.
	   With the workaround some request can be slow (to try to help with this I have cached the data)		

Time Taken:
	-3 hours to get it all working
	-Then as much time as I liked to:
		-clean up the code fully
		-add tests
		-use CSS Modules (figure out how to add this without ejecting)
		-fix CORS issue

TODO's:
	-think about whether we want to update the results if the geolocation changes (maybe a refresh button)
