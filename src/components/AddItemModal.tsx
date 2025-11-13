import React, { useState, useRef, ReactElement } from 'react';
import { FiX, FiUpload } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../services/store';
import { addItem } from '../services/slices/itemsSlice';
import { TItem } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }): ReactElement | null => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<{title?: string; description?: string; image?: string}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const FiXIcon = FiX as React.ElementType;
  const FiUploadIcon = FiUpload as React.ElementType;

  const validateForm = () => {
    const newErrors: {title?: string; description?: string; image?: string} = {};    
    const titleTrimmed = title.trim();
    if (!titleTrimmed) {
      newErrors.title = 'Название обязательно для заполнения';
    } else if (titleTrimmed.length < 3) {
      newErrors.title = 'Название должно содержать минимум 3 буквы';
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]{3,}$/i.test(titleTrimmed)) {
      newErrors.title = 'Название должно содержать только буквы и пробелы';
    }

    const descriptionTrimmed = description.trim();
    if (!descriptionTrimmed) {
      newErrors.description = 'Описание обязательно для заполнения';
    } else {
      const wordCount = descriptionTrimmed.split(/\s+/).filter(word => word.length > 0).length;
      if (wordCount < 2) {
        newErrors.description = 'Описание должно содержать минимум 2 слова';
      } else if (descriptionTrimmed.length < 10) {
        newErrors.description = 'Описание должно содержать минимум 10 символов';
      }
    }    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newItem: TItem = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),          
      images: imagePreview ? [{ id: 1, image_url: imagePreview }] : [],
      isFavorite: false,
      fulldescription: description.trim(),
      img: imagePreview,
    };

    dispatch(addItem(newItem));
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription(''); 
    setImagePreview('');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors({...errors, title: undefined});
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors({...errors, description: undefined});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={handleClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <h3>Добавить новую карточку</h3>
          <FiXIcon className="close_icon" onClick={handleClose} />
        </div>
        
        <form onSubmit={handleSubmit} className="add_item_form">
          <div className="form_group">
            <label>Название карточки *</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              className={errors.title ? 'error' : ''}
              placeholder="Введите название (минимум 3 буквы)"
            />
            {errors.title && <span className="error_message">{errors.title}</span>}
          </div>

          <div className="form_group">
            <label>Описание *</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              rows={3}
              required
              className={errors.description ? 'error' : ''}
              placeholder="Введите описание (минимум 2 слова)"
            />
            {errors.description && <span className="error_message">{errors.description}</span>}
          </div>
       
          <div className="form_group">
            <label>Изображение</label>
            <div 
              className="image_upload"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image_preview" />
              ) : (
                <div className="upload_placeholder">
                  <FiUploadIcon />
                  <span>Загрузить изображение в формате .jpeg</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
            {errors.image && <span className="error_message">{errors.image}</span>}
          </div>

          <div className="form_actions">
            <button type="button" onClick={handleClose} className="cancel_btn">
              Отмена
            </button>
            <button type="submit" className="submit_btn">
              Добавить карточку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;