import { useNavigate } from "react-router-dom";

export const ShowNothing = ({ isFavorite = false }) => {
  const navigate = useNavigate();
  return (
    <div className="empty">
      <h5>В вашем избранном пока пусто</h5>

      <h5 className="regular">
        Вы можете найти интересующие вас картинки на главной странице
      </h5>
      <button
        className="button_empty_fav"
        onClick={() => navigate("/products")}
      >
        На главную
      </button>
    </div>
  );
};
