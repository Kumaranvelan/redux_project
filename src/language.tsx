
import { Button, Card, Flex, Select,  } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/hook";
import { setLanguage } from "./store/language.slice";
import { decreament, increament } from "./store/counter.slice";
import { toggleTheme } from "./store/themeSlice";


const translations: Record<string, string> = {
  tamil:
    "உங்கள் பயன்பாட்டின் முழு நிலை மரம் ஒரு ஒற்றை சேமிப்பகத்தில் உள்ளது...",
  kannada: "ನಿಮ್ಮ ಅಪ್ಲಿಕೇಶನ್‌ನ ಸಂಪೂರ್ಣ ಗ್ಲೋಬಲ್ ಸ್ಥಿತಿ ಒಂದು ಗಾಳಿಯಲ್ಲಿದೆ...",
  telugu:
    "మీ యాప్ యొక్క మొత్తం గ్లోబల్ స్థితి ఒకే స్టోర్ లో నిల్వ చేయబడుతుంది...",
  hindi: "आपके ऐप की पूरी वैश्विक स्थिति एक ही स्टोर में संग्रहीत होती है...",
  en: "The whole global state of your app is stored in an object tree inside a single store...",
};

const options = [
  { label: "Tamil", value: "tamil" },
  { label: "Kannada", value: "kannada" },
  { label: "Telugu", value: "telugu" },
  { label: "Hindi", value: "hindi" },
  { label: "English", value: "en" },
];

const Language = () => {
  const dispatch = useDispatch();
  const language = useAppSelector((state) => state.language.language);
  const count = useAppSelector((state) => state.counter.value);
  const theme = useAppSelector((state) => state.theme.theme);

  const handleChange = (value: string) => {
    dispatch(setLanguage(value));
  };



  return (
    <>
      <div
        style={{
          backgroundColor: theme === "light" ? "#fff" : "black",
          color: theme === "light" ? "#000" : "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          transition: "0.3s ease-in-out",
        }}
      >
        <Flex justify="center" >
      
          <Card>
          {/* <Button onClick={() => dispatch(toggleTheme())}>
            Switch to {theme === "light" ? "Dark" : "light"} Mode
          </Button> */}
            <h1>Select any language</h1>
            <Select
              style={{ width: "100%" }}
              placeholder="Select one language"
              defaultValue={language}
              onChange={handleChange}
              options={options}
            />
            <p>{translations[language]}</p>

          </Card>
        </Flex>
      
      </div>
    </>
  );
};

export default Language;
