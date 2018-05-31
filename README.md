
After installing the app type 'npm start' to run it.
The app will launch on http://localhost:3000

Implementation Notes:
	- Used create-react-app to get something running fast. (https://github.com/facebookincubator/create-react-app)
	- Decided to implement the bonus points task from the offset so that I could have 2 pages/components.
	  I thought having more than one would demonstrate my structure better.
	- Decided no need for a state management library like Redux at this point.

Issues:
	 - Many of the bank API Urls give a CORS error, so I did a quick temporary work around in AtmsContainer.
	 		(also some don't work at all for example First Trust Bank)
	 -My Geolocation at home was being flakey

Time Taken:
	-2 hours to get it all roughly working
	-Another hour or so for styling it nicely and cleaning up the code a bit
	-Then a fair bit more time adding tests

TODO's:
	-cache the atm data per bank, rather than requesting it each time
	-use CSS modules for nicely scoped styles. (I think I need to eject in order to setup this up, which I'm not keen on)


MUST FINISH:
sort code more - just ATMContainer
add tests
understand router better
