
export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  // Tant qu'il reste des éléments à mélanger...
  while (currentIndex !== 0) {
    // Choisissez un élément restant...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Et échangez-le avec l'élément actuel.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
