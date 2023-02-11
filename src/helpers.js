function matchesAtLeastOne(sentences, words) {
  for (const word of words) {
    if (sentences.includes(word)) {
      return true;
    }
  }

  return false;
}

// eslint-disable-next-line import/prefer-default-export
export { matchesAtLeastOne };
