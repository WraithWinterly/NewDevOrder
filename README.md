# Welcome to New Dev Order

New Dev Order sets up founders with the developers they have always been looking for.

This is the mobile application for Android.
It supports connecting to Solana using the Solana Mobile Wallet Adapter SDK.

## Setup

Run &nbsp;`yarn`&nbsp; to install node dependencies. Do this regardless of platform.
Copy the &nbsp;`.env.example`&nbsp; file and rename it to &nbsp;`.env`&nbsp; in both the root directory and server directory.

### Android

- Have Android Studio and the Android SDK installed.
- Make sure the &nbsp;`local.properties`&nbsp; file points to your Android SDK.
- Connect your android phone. Run &nbsp;`adb devices`&nbsp; to ensure your device shows up. If it doesn't, you need to install android-platform-tools and add it to PATH.
- Run &nbsp;`yarn run android`&nbsp;.

### ~~iOS~~

#### Please note iOS support has been dropped until Solana Mobile Wallet SDK supports it.

- ~~On a Mac, have XCode installed.~~
- ~~Load the project in XCode and let it initialize.~~
- ~~Inside VSCode, run &nbsp;`pod install`&nbsp; in the iOS folder.~~
- ~~In XCode, set up your developer signing certificate. Free Apple developer accounts are limited to 10 app ID's which expire every week.~~
- ~~Inside XCode, Use &nbsp;`Command + R`&nbsp; to build and install the project to your iPhone.~~
- ~~Run &nbsp;`yarn run ios` &nbsp;to launch the development server.~~

~~Note: Any time you make dependency or link changes, make sure to run &nbsp;`pod install`&nbsp; if you run into issues.~~

### Web

This application will not support web. It does not use Expo, and it is specifically designed to use the Solana Mobile Wallet Adapter. Connecting to Solana on web is trivial and can be done in a separate project.
