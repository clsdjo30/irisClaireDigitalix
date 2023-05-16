import "dotenv/config";

export default {
  "expo": {
    "extra": {
      "eas": {
        "projectId": "185246d5-a728-4ce0-afed-6ac163ace50f"
      },
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    },
    "name": "irisClaireDigitalix",
    "slug": "irisclairedigitalix",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icons/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash/Splash002.png",
      "resizeMode": "cover"
    },
    "platforms": [
      "ios",
      "android",
    ],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.digitalix.irisclaire",
      "adaptiveIcon": {
        "foregroundImage": "./assets/icons/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/icons/favicon.png"
    }
  }
}
