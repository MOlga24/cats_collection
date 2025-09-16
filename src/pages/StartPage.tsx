import { useNavigate } from "react-router-dom";

export const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="empty">
      <button className="button_empty" onClick={() => navigate("/products")}>
        Посмотреть котиков!
      </button>
    </div>
  );
};
