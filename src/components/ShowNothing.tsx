import { useNavigate } from "react-router-dom";

export const ShowNothing = ({ isFavorite = false }) => {
  const navigate = useNavigate();
  return (
    
      <div className="empty">
        {isFavorite ? (
          <h5>В вашем избранном пока пусто</h5>
        ) : (
          <h5>Ваша корзина пока пуста</h5>
        )}
        <h5 className="regular">
          Вы можете найти интересующие вас картинки на главной странице
        </h5>
        <button className="button" onClick={() => navigate("/products")}>
          На главную
        </button>
      </div>
   
  );
};