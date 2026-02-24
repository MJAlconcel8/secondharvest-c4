import React, { useState, useEffect, useRef } from 'react'
import './EventEditModal.scss'

const EventEditModal = ({ event, onSubmit, onRequestClose, onDirtyChange }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventImage: null,
    eventType: 'community',
    description: '',
    hostName: '',
    eventDate: ''
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [formError, setFormError] = useState('')
  const initialFormRef = useRef({
    eventName: '',
    eventImage: null,
    eventType: 'community',
    description: '',
    hostName: '',
    eventDate: ''
  })
  const initialImageRef = useRef(null)

  // Helper function to format date to yyyy-mm-dd
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    if (event) {
      const normalizedEvent = {
        eventName: event.eventName || '',
        eventImage: event.eventImage || null,
        eventType: event.eventType || 'community',
        description: event.description || '',
        hostName: event.hostName || '',
        eventDate: formatDateForInput(event.eventDate)
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(normalizedEvent)
      setImagePreview(normalizedEvent.eventImage)
      initialFormRef.current = normalizedEvent
      initialImageRef.current = normalizedEvent.eventImage
      setFormError('')
    }
  }, [event])

  useEffect(() => {
    if (!onDirtyChange) {
      return
    }
    const initialForm = initialFormRef.current
    const isDirty =
      formData.eventName.trim() !== initialForm.eventName.trim() ||
      formData.eventType !== initialForm.eventType ||
      formData.description.trim() !== initialForm.description.trim() ||
      formData.hostName.trim() !== initialForm.hostName.trim() ||
      formData.eventDate.trim() !== initialForm.eventDate.trim() ||
      imagePreview !== initialImageRef.current
    onDirtyChange(isDirty)
  }, [formData, imagePreview, onDirtyChange])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (formError) {
      setFormError('')
    }
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



  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = formData.eventName.trim()
    const trimmedDescription = formData.description.trim()
    const trimmedHost = formData.hostName.trim()
    const trimmedDate = formData.eventDate.trim()
    if (!trimmedName || !trimmedDescription || !trimmedHost || !trimmedDate) {
      setFormError('Please fill out all required fields before saving changes.')
      return
    }
    const finalImageUrl = imagePreview
    const updatedEvent = {
      ...event,
      eventName: trimmedName,
      eventImage: finalImageUrl,
      eventType: formData.eventType,
      description: trimmedDescription,
      hostName: trimmedHost,
      eventDate: trimmedDate
    }
    onSubmit(updatedEvent)
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  const currentImagePreview = imagePreview

  return (
    <div className="event-edit-modal" onClick={handleModalClick}>
      <div className="event-edit-header">
        <h2>Edit Event</h2>
        <button className="close-button" onClick={onRequestClose}>×</button>
      </div>
      <form onSubmit={handleSubmit} className="event-edit-form">
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
              {imagePreview && imagePreview !== event.eventImage ? 'Change Photo' : 'Change Photo'}
            </label>
            {imagePreview && imagePreview !== event.eventImage && <span className="file-selected">✓ Photo selected</span>}
          </div>
          <p className="form-helper">Update the photo or leave as is</p>
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
            Save Changes
          </button>
        </div>
        {formError && <p className="form-error">{formError}</p>}
      </form>
    </div>
  )
}

export default EventEditModal
