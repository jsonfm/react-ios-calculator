import { ReactNode, useEffect, useState } from "react";

const Button = ({
  children,
  orange,
  dark,
  gray,
  onClick,
  lg,
}: {
  children?: ReactNode;
  orange?: boolean;
  dark?: boolean;
  gray?: boolean;
  lg?: boolean;
  onClick?: () => void;
}) => {
  const orangeColor = "#ff8f00";
  const darkColor = "#2d2d2d";
  const grayColor = "#9b9b9b";
  let backgroundColor = orangeColor;
  if (orange) {
    backgroundColor = orangeColor;
  }
  if (dark) {
    backgroundColor = darkColor;
  }
  if (gray) {
    backgroundColor = grayColor;
  }
  const style = {
    backgroundColor,
  };
  return (
    <button
      className={`${
        lg ? "w-40" : "w-20"
      } h-20 rounded-full flex items-center justify-center text-2xl active:opacity-80 duration-200`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const concat = (value: string) => {
    if (text.startsWith("-") && value === "-") return;
    if (value != "0" && text.startsWith("0")) {
      setText(value);
      return;
    }
    if (value === "0" && text.startsWith("0")) return;
    if (text.startsWith("0") && !text.includes(".")) {
      setText(text + value);
      return;
    }
    if (text.startsWith("0") && text.includes(".")) {
      setText(text + value);
      return;
    }

    setText(text + value);
  };

  const toggleSign = () => {
    if (text.startsWith("-")) {
      const newValue = "" + text;
      setText(newValue);
    }
    if (text.startsWith("")) {
      const newValue = "-" + text;
      setText(newValue);
    }
  };
  const del = () => {
    const string = text?.substring(0, text.length - 1);
    setText(string);
  };

  useEffect(() => {
    try {
      const value = eval(text?.replace("x", "*"));
      setResult(value);
    } catch (error) {
      setResult("0");
    }
  }, [text]);

  const clean = () => {
    setText("0");
  };

  return (
    <section className="w-screen h-screen flex items-center bg-black text-white">
      <div className="min-w-[380px] max-w-[400px] max-h-[600px] mx-auto h-screen px-4">
        <div className="h-[20%] flex flex-col gap-2 items-end justify-end px-4 py-4">
          <p className="text-5xl -mt-10">{text}</p>
          <p className="text-2xl text-gray-200">{result}</p>
        </div>
        <div className="h-[80%] w-full flex flex-col gap-4 pt-6">
          <div className="flex justify-between">
            <Button onClick={clean} gray>
              C
            </Button>
            <Button onClick={toggleSign} gray>
              +/-
            </Button>
            <Button onClick={del} gray>
              del
            </Button>
            <Button onClick={() => concat("/")} orange>
              /
            </Button>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => concat("7")} dark>
              7
            </Button>
            <Button onClick={() => concat("8")} dark>
              8
            </Button>
            <Button onClick={() => concat("9")} dark>
              9
            </Button>
            <Button onClick={() => concat("x")} orange>
              X
            </Button>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => concat("4")} dark>
              4
            </Button>
            <Button onClick={() => concat("5")} dark>
              5
            </Button>
            <Button onClick={() => concat("6")} dark>
              6
            </Button>
            <Button onClick={() => concat("-")} orange>
              -
            </Button>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => concat("1")} dark>
              1
            </Button>
            <Button onClick={() => concat("2")} dark>
              2
            </Button>
            <Button onClick={() => concat("3")} dark>
              3
            </Button>
            <Button onClick={() => concat("+")} orange>
              +
            </Button>
          </div>
          <div className="flex justify-between">
            <Button lg onClick={() => concat("0")} dark>
              0
            </Button>

            <Button onClick={() => concat(".")} dark>
              .
            </Button>
            <Button orange>=</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
