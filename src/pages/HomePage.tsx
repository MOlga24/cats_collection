import Items from "../components/Items";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { ScrollToTop } from "../components/ScrollToTop";

export const Home = () => {
  const items = useSelector((state: RootState) => state.items.items);

  return (
    <div className="container_page">
      <Items items={items} />
      <ScrollToTop />
    </div>
  );
};
