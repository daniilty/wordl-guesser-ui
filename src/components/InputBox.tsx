import { ANY } from './common';
import '../styles/InputBox.css';

type InputBoxProps = {
  letters: Letter[],
  onValueChange: (value: string, pos: number) => void,
  onFocusChange: (pos: number) => void
  onChangeInPlace: (value: boolean, pos: number) => void,
}

export type Letter = {
  val: string,
  isFocused: boolean,
  isInPlace: boolean
}

export const InputBox = (props: InputBoxProps) => {
  const boxes = props.letters.map((letter, i) => {
    return (
      <button
        onClick={() => {
          if (!letter.isFocused) {
            const latestFocused = props.letters.findIndex((el) => {
              return el.isFocused
            })

            if (latestFocused !== -1) {
              props.onFocusChange(latestFocused);
            }

            props.onFocusChange(i);
            return;
          }

          if (letter.val === ANY) {
            return;
          }

          if (!letter.isInPlace) {
            props.onValueChange(ANY, i);
            props.onChangeInPlace(!letter.isInPlace, i);

            return;
          }

          props.onChangeInPlace(!letter.isInPlace, i);
          return;
        }}
        style={{
          backgroundColor: getLetterBackgroundColor(letter),
          color: getLetterColor(letter)
        }}
        key={i}
        className="input_box"
      >
        {letter.val}
      </button>
    );
  });

  return (
    <div className="input_row">
      {boxes}
    </div>
  );
}

export const newDefaultLetter = (val: string): Letter => {
  return {
    val: val,
    isFocused: false,
    isInPlace: true,
  }
}

const getLetterBackgroundColor = (letter: Letter): string => {
  if (letter.isFocused) {
    return 'gray';
  }

  if (letter.val === ANY) {
    return 'white';
  }

  return letter.isInPlace ? 'green' : 'red';
}

const getLetterColor = (letter: Letter): string => {
  if (letter.val === ANY) {
    return 'black';
  }

  return 'white';
}
