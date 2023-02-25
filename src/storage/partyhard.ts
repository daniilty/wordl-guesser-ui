const keyPartyHard = 'party_hard';
const valPartyHard = 'y';

export const isPartyHard = (): boolean => {
  return localStorage.getItem(keyPartyHard) === valPartyHard;
}

export const togglePartyHard = () => {
  isPartyHard() ?
    localStorage.setItem(keyPartyHard, 'n') :
    localStorage.setItem(keyPartyHard, valPartyHard);
}

