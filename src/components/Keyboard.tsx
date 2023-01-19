import "../styles/Keyboard.css"
import { useMediaQuery } from "react-responsive"

type KeyboardProps = {
    onKeyPress: (key: string) => void
    ignoredMap: Map<string, boolean>
    notInPlaceMap: Map<string, boolean>
}

export const Keyboard = (props: KeyboardProps) => {
    const isTablet = useMediaQuery({ query: `(max-width: 700px)` })
    const layout = isTablet
        ? [
              ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
              ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "➦"],
              ["-", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "+"],
          ]
        : [
              ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
              ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
              ["-", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "+"],
          ]

    const keyboardButtons = layout.map((arr, i) => {
        return (
            <div className="keyboard_row" key={i}>
                {arr.map((letter, j) => {
                    return (
                        <button
                            onClick={() => {
                                props.onKeyPress(letter)
                            }}
                            style={{
                                color: "white",
                                background: getKeyboardBackgroundColor(
                                    letter,
                                    props.ignoredMap,
                                    props.notInPlaceMap
                                ),
                            }}
                            className="keyboard_button"
                            key={j}
                        >
                            {letter}
                        </button>
                    )
                })}
            </div>
        )
    })

    return <div className="keyboard">{keyboardButtons}</div>
}

const getKeyboardBackgroundColor = (
    key: string,
    ignoredMap: Map<string, boolean>,
    notInPlaceMap: Map<string, boolean>
): string => {
    const isIgnored = ignoredMap.get(key)
    if (isIgnored) {
        return "rgba(255, 0, 0, 0.2)"
    }

    const isNotInPlace = notInPlaceMap.get(key)
    if (isNotInPlace) {
        return "rgba(0, 255, 0, 0.2)"
    }

    return "rgba(255, 255, 255, 0.2)"
}
