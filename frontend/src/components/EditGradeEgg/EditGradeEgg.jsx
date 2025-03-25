import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import axios from "axios";
import "./EditGradeEgg.css";

const EditGradeEgg = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const eggState = location.state?.egg;

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [editedEgg, setEditedEgg] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (eggState) {
      setEditedEgg({
        name: eggState.name || "",
        description: eggState.description || "",
        price: eggState.price || "",
      });
      setLoading(false);
    } else {
      const fetchEgg = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/gradeeggs/${id}`);
          setEditedEgg(response.data);
        } catch (error) {
          setError(error.response?.data?.message || "Error fetching egg details.");
        } finally {
          setLoading(false);
        }
      };
      fetchEgg();
    }
  }, [id, eggState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEgg((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setError("");
    try {
      await axios.put(`http://localhost:5000/gradeeggs/${id}`, editedEgg);
      alert("Egg details updated successfully!");
      navigate("/admingradeegglist");
    } catch (error) {
      setError(error.response?.data?.message || "Error updating egg. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm("Are you sure you want to delete this egg?")) return;

    setIsDeleting(true);
    setError("");
    try {
      await axios.delete(`http://localhost:5000/gradeeggs/${id}`);
      alert("Egg deleted successfully!");
      navigate("/admingradeegglist");
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting egg. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="edit-grade-egg">
      <AdminTopBar />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="edit-form-container">
          <h2>Edit Grade Egg</h2>
          <form className="edit-form">
            <label>Name:</label>
            <input type="text" name="name" value={editedEgg.name} onChange={handleChange} />

            <label>Description:</label>
            <textarea name="description" value={editedEgg.description} onChange={handleChange}></textarea>

            <label>Price (KSh):</label>
            <input type="number" name="price" value={editedEgg.price} onChange={handleChange} />

            <div className="button-group">
              <button type="button" onClick={handleUpdate} className="save-btn" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={handleRemove} className="remove-btn" disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete Egg"}
              </button>
              <button type="button" onClick={() => navigate("/admingradeegglist")} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditGradeEgg;
