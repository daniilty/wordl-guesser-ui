import '../styles/button.css';

type ButtonProps = {
  emoji: string,
  text: string,
  onClick: () => void,
};

export const Button = (props: ButtonProps) => {
  return (
    <button className="emoji_button" onClick={() => props.onClick()}>
      <p><span className="emoji">{props.emoji}</span>{props.text}</p>
    </button>
  );
}
