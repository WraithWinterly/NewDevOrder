# Welcome to New Dev Order

New Dev Order sets up founders with the developers they have always been looking for.

This is the mobile application for Android and iOS.
It supports connecting Phantom Wallet using Deep Links.

## Setup

Run &nbsp;`yarn`&nbsp; to install node dependencies. Do this regardless of platform.

### Android

- Have Android Studio and the Android SDK installed.
- Make sure the &nbsp;`local.properties`&nbsp; file points to your Android SDK.
- Connect your android phone. Run &nbsp;`adb devices`&nbsp; to ensure your device shows up. If it doesn't, you need to install android-platform-tools and add it to PATH.
- Run &nbsp;`npm run android`&nbsp;.

### iOS

- On a Mac, have XCode installed.
- Load the project in XCode and let it initialize.
- Inside VSCode, run &nbsp;`pod install`&nbsp; in the iOS folder.
- In XCode, set up your developer signing certificate. Free Apple developer accounts are limited to 10 app ID's which expire every week.
- Inside XCode, Use &nbsp;`Command + R`&nbsp; to build and install the project to your iPhone.
- Run &nbsp;`npm run ios` &nbsp;to launch the development server.

Note: Any time you make dependency or link changes, make sure to run &nbsp;`pod install`&nbsp; if you run into issues.

### Web

This application will not support web. It does not use Expo, and it is specifically designed to use Phantom mobile deep links. Connecting to Phantom Wallet on web is trivial and can be done in a separate project.
