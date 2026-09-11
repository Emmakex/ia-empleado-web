import { HomePage } from "../../../components/home-page";
import { getDictionary } from "../../../lib/i18n";

export default function EnglishHomePage() {
  return <HomePage locale="en" dictionary={getDictionary("en")} />;
}
