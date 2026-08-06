const AKSARA_BALI_EXACT: Record<string, string> = {
  "Ni Wayan Ryas Ganitri": "ᬦᬶᬯᬬᬦ᭄‌ᬭ᭄ᬬᬲ᭄‌ᬕᬦᬶᬢ᭄ᬭᬶ",
  "Ni Wayan Ella Ermayani": "ᬦᬶᬯᬬᬦ᭄​ᬏᬮ᭄ᬮ​ᬏᬃᬫᬬᬦᬶ",
  "Ni Made Vira Gayatri": "ᬦᬶᬫᬤᬾᬯᬶᬭᬕᬬᬢ᭄ᬭᬶ",
  "I Made Jyestha Cahyadiguna": "ᬇᬫᬤᬾᬚ᭄ᬬᬾᬱ᭄ᬞᬘᬄᬬᬤᬶᬕᬸᬦ",
  "Ni Komang Risna Gianitri": "ᬦᬶᬓᬵᬫᬗ᭄‌ᬭᬶᬲ᭄ᬦ​ᬕᬶᬬᬦᬶᬢ᭄ᬭᬶ",
  "Ni Wayan Kusumawati": "ᬦᬶᬯᬬᬦ᭄‌ᬓᬸᬲᬸᬫᬯᬢᬶ",
  "Ni Ketut Emma Dharmaning Putri": "ᬦᬶᬓᬾᬢᬸᬢ᭄‌ᬏᬫ᭄ᬫ​ᬥᬃᬫᬦᬶᬗ᭄​ᬧᬸᬢ᭄ᬭᬶ"
};

const AKSARA_BALI_WORDS: Record<string, string> = {
  "ni": "ᬦᬶ",
  "i": "ᬇ",
  "wayan": "ᬯᬬᬦ᭄",
  "made": "ᬫᬤᬾ",
  "nyoman": "ᬜᬵᬫᬦ᭄",
  "ketut": "ᬓᬾᬢᬸᬢ᭄",
  "komang": "ᬓᬵᬫᬗ᭄",
  "putu": "ᬧᬸᬢᬸ",
  "kadek": "ᬓᬤᬾᬓ᭄",
  "gede": "ᬕᬤᬾ",
  "putra": "ᬧᬸᬢ᭄ᬭ",
  "putri": "ᬧᬸᬢ᭄ᬭᬶ",
  "santi": "ᬲᬦ᭄ᬢᬶ",
  "sari": "ᬲᬦ᭄ᬢᬶ",
  "ayu": "ᬅᬬᬸ",
  "agus": "ᬅᬕᬸᬲ᭄",
  "sastra": "ᬲᬲ᭄ᬢ᭄ᬭ",
  "dharma": "ᬥᬃᬫ",
  "jaya": "ᬚᬬ",
  "wijaya": "ᬯᬶᬚᬬ",
  "santiaga": "ᬲᬦ᭄ᬢᬶᬅᬕ",
  "sentana": "ᬲᬾᬦ᭄ᬢᬦ",
  "oka": "ᬑᬓ",
  "alit": "ᬅᬮᬶᬢ᭄",
  "suryamanik": "ᬲᬸᬭ᭄ᬬᬫᬦᬶᬓ᭄"
};

/**
 * Translates a name to Aksara Bali.
 * First checks for an exact match.
 * Then falls back to a word-by-word prefix translation.
 */
export function translitToBalinese(name: string): string {
  const trimmed = name.trim();
  if (AKSARA_BALI_EXACT[trimmed]) {
    return AKSARA_BALI_EXACT[trimmed];
  }

  // Split and translate word-by-word
  const words = trimmed.toLowerCase().split(/\s+/);
  const resultWords: string[] = [];
  
  for (const word of words) {
    if (AKSARA_BALI_WORDS[word]) {
      resultWords.push(AKSARA_BALI_WORDS[word]);
    } else {
      // Fallback: simple character substitution to make it look like Aksara Bali structure
      // We will generate pseudo-aksara or skip to avoid making it unreadable,
      // but let's try to map basic consonants/vowels for unknown words!
      let bWord = "";
      let i = 0;
      while (i < word.length) {
        const char = word[i];
        const next = word[i + 1] || "";
        const nextNext = word[i + 2] || "";
        
        if (char === 'n' && next === 'y') { bWord += "ᬜ"; i += 2; }
        else if (char === 'n' && next === 'g') { bWord += "ᬗ"; i += 2; }
        else if (char === 'c' && next === 'h') { bWord += "ᬘ"; i += 2; }
        else if (char === 't' && next === 'h') { bWord += "ᬣ"; i += 2; }
        else if (char === 'k') { bWord += "ᬓ"; i++; }
        else if (char === 'g') { bWord += "ᬕ"; i++; }
        else if (char === 'c') { bWord += "ᬘ"; i++; }
        else if (char === 'j') { bWord += "ᬚ"; i++; }
        else if (char === 't') { bWord += "ᬢ"; i++; }
        else if (char === 'd') { bWord += "ᬤ"; i++; }
        else if (char === 'n') { bWord += "ᬦ"; i++; }
        else if (char === 'p') { bWord += "ᬧ"; i++; }
        else if (char === 'b') { bWord += "ᬩ"; i++; }
        else if (char === 'm') { bWord += "ᬫ"; i++; }
        else if (char === 'y') { bWord += "ᬬ"; i++; }
        else if (char === 'r') { bWord += "ᬭ"; i++; }
        else if (char === 'l') { bWord += "ᬮ"; i++; }
        else if (char === 'w') { bWord += "ᬯ"; i++; }
        else if (char === 's') { bWord += "ᬲ"; i++; }
        else if (char === 'h') { bWord += "ᬄ"; i++; }
        else if (char === 'a') { bWord += ""; i++; } // default vowel is 'a' in Aksara Bali
        else if (char === 'i') { bWord += "ᬶ"; i++; }
        else if (char === 'u') { bWord += "ᬸ"; i++; }
        else if (char === 'e') { bWord += "ᬾ"; i++; }
        else if (char === 'o') { bWord += "ᬵ"; i++; }
        else { i++; }
      }
      if (bWord) {
        resultWords.push(bWord);
      }
    }
  }

  return resultWords.join("​"); // zero-width space
}
