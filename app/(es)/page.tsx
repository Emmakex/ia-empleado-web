import { HomePage } from "../../components/home-page";
import { getDictionary } from "../../lib/i18n";

export default function SpanishHomePage() {
  return <HomePage locale="es" dictionary={getDictionary("es")} />;
}
