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
            props.onFocusChange(i);
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
          color: 'white'
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
    return 'rgba(255, 255, 255, 0.2)';
  }

  if (letter.val === ANY) {
    return 'rgba(255, 255, 255, 0.5)';
  }

  return letter.isInPlace ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
}

