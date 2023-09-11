import "dotenv/config";

export default {
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/185246d5-a728-4ce0-afed-6ac163ace50f"
    },
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
      openAiId: process.env.OPEN_AI_ID,
      googleRevenueCatApiKey: process.env.GOOGLE_REVENUE_CAT_API_KEY,
    },
    "name": "irisClaireDigitalix",
    "slug": "irisclairedigitalix",
    "version": "1.0.8",
    "orientation": "portrait",
    "icon": "./assets/icons/iris.png",
    "scheme": "com.digitalix.irisclaire",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash/splash.png",
      "resizeMode": "cover",
    },
    "platforms": [
      "ios",
      "android",
    ],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "splash": {
      "image": "./assets/splash/splash.png",
      "resizeMode": "cover"
    },
      "runtimeVersion": {
        "policy": "sdkVersion"
      }
    },
    "android": {
      "package": "com.digitalix.irisclaire",
      "versionCode": 7,
      "googleServicesFile": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/icons/adaptive-icon.png",
        "backgroundColor": "#C8B5E4"
      },
      "runtimeVersion": {
        "policy": "appVersion"
      }
    },
    "web": {
      "favicon": "./assets/icons/favicon.png"
    }
  }
}

