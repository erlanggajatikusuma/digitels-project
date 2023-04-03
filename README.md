### Issues react-native-maps with react-native-firebase

[Here](https://stackoverflow.com/questions/74465963/react-native-maps-not-working-with-react-native-firebase-with-use-framework)

Add the following to your Podfile above the `use_native_modules!` function and run `pod install` in the ios folder:

```ruby
# choose dependecies firebase you want install
pod 'react-native-google-maps', :path => rn_maps_path
pod 'Firebase', :modular_headers => true
pod 'FirebaseCore', :modular_headers => true
pod 'FirebaseCoreInternal', :modular_headers => true
pod 'FirebaseStorageInternal', :modular_headers => true
pod 'FirebaseCoreExtension', :modular_headers => true
pod 'FirebaseAppCheckInterop', :modular_headers => true
pod 'FirebaseAuthInterop', :modular_headers => true
pod 'FirebaseMessagingInterop', :modular_headers => true
pod 'GTMSessionFetcher', :modular_headers => true
pod 'FirebaseAppCheckInterop', :modular_headers => true
pod 'FirebaseAuthInterop', :modular_headers => true
pod 'GoogleUtilities', :modular_headers => true
```
