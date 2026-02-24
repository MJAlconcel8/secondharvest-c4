import React, { useState, useEffect } from 'react'
import './EventFormModal.scss'

const EventFormModal = ({ onSubmit, onRequestClose, onDirtyChange, onInvalidSubmit }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventImage: null,
    eventType: 'community',
    description: '',
    hostName: '',
    eventDate: ''
  })
  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        eventImage: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const getGeneratedImageUrl = () => {
    return `https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=500&fit=crop&q=80`
  }

  const isFormDirty = () => {
    return (
      formData.eventName.trim() !== '' ||
      formData.description.trim() !== '' ||
      formData.eventType !== 'community' ||
      formData.hostName.trim() !== '' ||
      formData.eventDate.trim() !== '' ||
      Boolean(imagePreview)
    )
  }

  useEffect(() => {
    if (onDirtyChange) {
      onDirtyChange(isFormDirty())
    }
  }, [formData, imagePreview, onDirtyChange])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = formData.eventName.trim()
    const trimmedDescription = formData.description.trim()
    const trimmedHost = formData.hostName.trim()
    const trimmedDate = formData.eventDate.trim()
    if (!trimmedName || !trimmedDescription || !trimmedHost || !trimmedDate) {
      if (onInvalidSubmit) {
        onInvalidSubmit('Please fill out all required fields before creating the event.')
      }
      return
    }
    const finalImageUrl = imagePreview || getGeneratedImageUrl()
    const newEvent = {
      id: Date.now(),
      eventName: trimmedName,
      eventImage: finalImageUrl,
      eventType: formData.eventType,
      description: trimmedDescription,
      hostName: trimmedHost,
      eventDate: trimmedDate,
      color: '#7BB661'
    }
    onSubmit(newEvent)
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  const currentImagePreview = imagePreview || getGeneratedImageUrl()

  return (
    <div className="event-form-modal" onClick={handleModalClick}>
      <div className="event-form-header">
        <h2>Create New Event</h2>
        <button className="close-button" onClick={onRequestClose}>×</button>
      </div>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="image-preview-section">
          <img src={currentImagePreview} alt="Event preview" className="image-preview" />
        </div>

        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            placeholder="Enter event name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hostName">Host Name</label>
          <input
            type="text"
            id="hostName"
            name="hostName"
            value={formData.hostName}
            onChange={handleInputChange}
            placeholder="Enter host name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
          >
            <option value="community">Community Gathering</option>
            <option value="food">Food & Harvest</option>
            <option value="cooking">Cooking Workshop</option>
            <option value="fundraiser">Fundraiser</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eventImage">Upload Event Photo (Optional)</label>
          <div className="file-upload-wrapper">
            <input
              type="file"
              id="eventImage"
              name="eventImage"
              onChange={handleImageUpload}
              accept="image/*"
              className="file-input"
            />
            <label htmlFor="eventImage" className="file-label">
              {imagePreview ? 'Change Photo' : 'Choose Photo'}
            </label>
            {imagePreview && <span className="file-selected">✓ Photo selected</span>}
          </div>
          <p className="form-helper">Leave empty to auto-generate based on event type</p>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            rows="4"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Event
          </button>
        </div>
      </form>
    </div>
  )
}

export default EventFormModal