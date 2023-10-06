export function goToYesDraw(navigation: { navigate: (arg0: string) => void; }) {
  navigation.navigate("YesDraw");
}

export function goToCrossDraw(navigation: { navigate: (arg0: string) => void; }) {
  navigation.navigate("CrossDraw");
}
export function goToProfilScreen(navigation: {
  navigate: (arg0: string) => void;
}) {
  navigation.navigate("Profil");
}

export function goToDayDraw(navigation: { navigate: (arg0: string) => void; }, daycard: { isdraw: boolean; }) {
  if (daycard.isdraw === false) {
    navigation.navigate("DayDraw");
  }
}
