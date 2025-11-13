import { useNavigate } from "react-router-dom";

export const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="empty">
      <button className="button" onClick={() => navigate("/items")}>
        Посмотреть котиков
      </button>
    </div>
  );
};
