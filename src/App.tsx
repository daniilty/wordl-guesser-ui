import { useState } from 'react';
import './styles/App.css';
import { InputBox, Letter, newDefaultLetter } from './components/InputBox';
import { Keyboard } from './components/Keyboard';
import { ANY, ENTER_KEY, DELETE_KEY, ADD_KEY } from './components/common';
import { find } from './api/find';

function App() {
  const MAX_LEN = 24;
  const MAX_ELEMENTS = 100;

  const [letters, setLetters] = useState(parseWord('*****'));
  const [ignored, setIgnored] = useState<string[]>([]);
  const [notInPlace, setNotInPlace] = useState<string[]>([]);
  const [possibleValues, setPossibleValues] = useState<string[]>([]);

  const l = Array.from(letters);

  const onFocusChange = (pos: number) => {
    l[pos].isFocused = !l[pos].isFocused;
    setLetters(l);
  };

  const onValueChange = (val: string, pos: number) => {
    l[pos].val = val;
    l[pos].isFocused = !l[pos].isFocused;
    l[pos].isInPlace = true;
    setLetters(l);
  };

  const onChangeInPlace = (val: boolean, pos: number) => {
    l[pos].isInPlace = val;
    l[pos].isFocused = !l[pos].isFocused;
    setLetters(l);
  };

  const ignoredMap = new Map<string, boolean>();
  const notInPlaceMap = new Map<string, boolean>();

  ignored.forEach((el) => {
    ignoredMap.set(el, true)
  })
  notInPlace.forEach((el) => {
    notInPlaceMap.set(el, true)
  })

  const possibleList = possibleValues.map((v, i) => (
    <li key={i}>{v}</li>
  ));

  return (
    <div className="App">
      <InputBox
        letters={letters}
        onFocusChange={onFocusChange}
        onValueChange={onValueChange}
        onChangeInPlace={onChangeInPlace}
      />
      <Keyboard ignoredMap={ignoredMap} notInPlaceMap={notInPlaceMap} onKeyPress={(key: string) => {
        if (key === ENTER_KEY) {
          find({
            ignored: ignored.join(''),
            guessed: notInPlace.join(''),
            pattern: lettersToString(letters),
            limit: MAX_ELEMENTS
          }).then((data) => {
            setPossibleValues(data);
          }).catch((err) => {
            console.error(err);
          })

          return;
        }

        const i = l.findIndex(findFocused);
        if (i === -1) {
          if (key === ADD_KEY) {
            if (l.length > MAX_LEN) {
              return;
            }

            l.push(newDefaultLetter(ANY));
            setLetters(l);
            return;
          }

          if (key === DELETE_KEY) {
            l.pop();
            setLetters(l);
            return;
          }

          const isIgnored = ignoredMap.get(key);
          if (isIgnored) {
            ignoredMap.delete(key);
            setIgnored(ignored.filter(filterAllExcept(key)));

            return;
          }

          const isNotInPlace = notInPlaceMap.get(key);
          if (isNotInPlace) {
            const newIgnored = Array.from(ignored);

            notInPlaceMap.delete(key);
            setNotInPlace(notInPlace.filter(filterAllExcept(key)));

            newIgnored.push(key);
            setIgnored(newIgnored);

            return;
          }

          const newNotInPlace = Array.from(notInPlace);
          newNotInPlace.push(key);
          setNotInPlace(newNotInPlace);

          return;
        }

        onValueChange(key, i);
      }} />
      <ul className="possible_list">
        {possibleList}
      </ul>
    </div>
  );
}

const parseWord = (word: string): Letter[] => {
  const letters: Letter[] = [];

  for (let s of word) {
    letters.push(newDefaultLetter(s));
  }

  return letters;
}

const findFocused = (el: Letter) => {
  return el.isFocused
}

const lettersToString = (letters: Letter[]): string => {
  return letters.map((letter) => {
    let prefix = '';

    if (!letter.isInPlace) {
      prefix = '!';
    }

    return prefix + letter.val
  }).join('')
}

const filterAllExcept = (key: string): (element: string) => boolean => {
  return (element: string) => {
    return key !== element;
  }
}

export default App;
