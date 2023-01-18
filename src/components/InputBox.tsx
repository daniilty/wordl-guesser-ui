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
  const handleUnfocused = (i: number) => {
    const latestFocused = props.letters.findIndex((el) => {
      return el.isFocused
    })

    if (latestFocused !== -1) {
      props.onFocusChange(latestFocused);
    }

    props.onFocusChange(i);
  }

  const handleAny = (i: number) => {
    props.onFocusChange(i);
  }

  const handleNotInPlace = (i: number, letter: Letter) => {
    props.onValueChange(ANY, i);
    props.onChangeInPlace(!letter.isInPlace, i);
  }

  const handleDefault = (i: number, letter: Letter) => {
    props.onChangeInPlace(!letter.isInPlace, i);
  }

  const boxes = props.letters.map((letter, i) => {
    return (
      <button
        onClick={() => {
          if (!letter.isFocused) {
            handleUnfocused(i);

            return;
          }

          if (letter.val === ANY) {
            handleAny(i);

            return;
          }

          if (!letter.isInPlace) {
            handleNotInPlace(i, letter);

            return;
          }

          handleDefault(i, letter);
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
    return 'rgba(255, 255, 255, 0.0)';
  }

  return letter.isInPlace ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
}

