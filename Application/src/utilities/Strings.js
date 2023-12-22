import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
    en: {
        HELLO_WORLD: "Hello world"
    },
    sv: {
        HELLO_WORLD: "Hej världen"
    },
    ur: {
        HELLO_WORLD: "ہیلو دنیا"
    }

});

export function ChangeAppLanguage(lang) {
    console.log(lang)
    strings.setLanguage(lang);

}
export default strings;