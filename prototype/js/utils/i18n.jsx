// TICMI i18n — simple ID/EN toggle
const LangCtx = React.createContext('id');

function useT() {
  const lang = React.useContext(LangCtx);
  return (id_text, en_text) => lang === 'id' ? id_text : en_text;
}

window.LangCtx = LangCtx;
window.useT   = useT;
