import { NativeEventEmitter, NativeModules } from 'react-native';

const RNNowPlaying = NativeModules.RNNowPlaying;
const NowPlayingEventEmitter = new NativeEventEmitter(RNNowPlaying);

class NowPlaying {
	/**
	Begin observing for music events
	Android: 
	- Register to 'all' music players intent in Native Module
	iOS:  
	- Register to Apple music events in Native Module
	- Auth and register Spotify events in Native Module if installed
	- Auth and fetch every 60sec Deezer now playing song
	**/
	startObserving(eventCallback) {
		console.log("NowPlaying startObserving");
		this.eventCallback = eventCallback;
		RNNowPlaying.startObserving();
		// Suscribe to Native Module events
		this.listener = NowPlayingEventEmitter.addListener(
			"NowPlayingEvent",
			this.eventCallback
		);
	}
	
	stopObserving() {
		console.log("NowPlaying stopObserving");
		this.listener.remove();
	}
}

export default new NowPlaying();
