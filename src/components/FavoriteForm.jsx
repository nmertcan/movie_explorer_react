import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { validateFavorite } from "../utils/favorites";

export default function FavoriteForm() {
  const { addFavorite, selectedMovie } = useContext(FavoritesContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (selectedMovie) {
      setName(selectedMovie.title);
      setDescription("");
      setErrors({});
      setSuccess("");
    }
  }, [selectedMovie]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateFavorite({ selectedMovie, name, description });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccess("");
      return;
    }

    addFavorite({
      id: selectedMovie.id,
      originalData: selectedMovie,
      customName: name.trim(),
      customDescription: description.trim(),
      addedAt: new Date().toISOString(),
    });

    setDescription("");
    setErrors({});
    setSuccess("Film favorilere eklendi.");
  };

  return (
    <form className="favorite-form" onSubmit={handleSubmit}>
      <h2>Favori Ekle</h2>

      {selectedMovie ? (
        <p className="selected-text">Seçilen film: {selectedMovie.title}</p>
      ) : (
        <p className="selected-text muted">Henüz film seçilmedi.</p>
      )}

      {errors.movie && <span className="field-error">{errors.movie}</span>}

      <label>
        Favori İsmi
        <input
          type="text"
          disabled={!selectedMovie}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Film adı"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <label>
        Açıklama
        <textarea
          disabled={!selectedMovie}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Bu filmi neden favorilerine ekliyorsun?"
          rows="4"
        />
        {errors.description && (
          <span className="field-error">{errors.description}</span>
        )}
      </label>

      {success && <p className="success-message">{success}</p>}

      <button type="submit" disabled={!selectedMovie}>
        Favorilere Ekle
      </button>
    </form>
  );
}
