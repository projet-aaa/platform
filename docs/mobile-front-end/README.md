# Mobile front-end documentation

A proof of concept has been developed for deploying a mobile version but nothing as been developed so far.

## Install

The guide to put together this POC was the [React-native get started page](https://facebook.github.io/react-native/docs/getting-started.html)
using linux and for android only (IOS requires a Mac and is very difficult to get up and running).

To run/build this POC, do everything on this page except the part about creating the project: it is already created.

To finish installing dependencies, do:
```sh
npm install
```

## Test (on android)

Launch android studio. Inside, run the AVD to get the list of virtual devices. Create one if need be using the 
marshmallow SDK (6.0), if you don't have it, install it.

Then launch that virtual device.

Then, in a terminal, go to the root or src-hmi in the project repository. Do:
```sh
react-native start
```
This will launch a js bundler server which will take care of installing your application when its built. 
Leave it running.
To run the application on the virtual device, do:
```sh
react-native run-android
```

### Trouble-shooting
* If you get an error like ENOSPC when running react-native start, its because linux only allows 
a certain number of files to be watched at any given time and the server needs this feature.
Just run :
```sh
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p 
```

## Coding

You could recode an entire application for android but in theory, you just need to recode the views and connect them 
to the redux architecture of the browser so that you don't have to recode API calls, state management and so on.