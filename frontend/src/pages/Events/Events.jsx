import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import EventCard from '../../components/EventCard/EventCard'
import EventFormModal from '../../components/EventFormModal/EventFormModal'
import EventDetailModal from '../../components/EventDetailModal/EventDetailModal'
import EventEditModal from '../../components/EventEditModal/EventEditModal'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import { eventService } from '../../services/eventService'
import './Events.scss'

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isCreateDirty, setIsCreateDirty] = useState(false)
  const [isEditDirty, setIsEditDirty] = useState(false)
  const [confirmType, setConfirmType] = useState(null)
  const [pendingCreateEvent, setPendingCreateEvent] = useState(null)
  const [pendingEditEvent, setPendingEditEvent] = useState(null)
  const [pendingDeleteEventId, setPendingDeleteEventId] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState('')

  const [eventsList, setEventsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const currentUserId = currentUser.id

  const getDefaultImageUrl = () => {
    return 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=500&fit=crop&q=80'
  }

  const ensureEventHasImage = (event) => {
    // Check localStorage first for uploaded images
    const storedImage = localStorage.getItem(`event-image-${event.id}`)
    return {
      ...event,
      eventImage: event.eventImage || storedImage || getDefaultImageUrl()
    }
  }

  const saveEventImage = (eventId, imageUrl) => {
    // Only store if it's a data URL (uploaded image)
    if (imageUrl && imageUrl.startsWith('data:')) {
      localStorage.setItem(`event-image-${eventId}`, imageUrl)
    }
  }

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const events = await eventService.getEvents()
        if (events && events.length > 0) {
          // Deduplicate events by ID and ensure each has an image
          const uniqueEvents = events
            .filter((event, index, self) =>
              index === self.findIndex((e) => e.id === event.id)
            )
            .map(ensureEventHasImage)
          setEventsList(uniqueEvents)
        }
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleAddEvent = () => {
    setIsModalOpen(true)
  }

  const handleSubmitCreate = (newEvent) => {
    if (!newEvent) {
      return
    }
    setPendingCreateEvent(newEvent)
    setConfirmType('create-submit')
  }

  const handleRequestCloseCreate = () => {
    if (isCreateDirty) {
      setConfirmType('close-create-dirty')
      return
    }
    setConfirmType('close-create-empty')
  }

  const handleCardClick = (event) => {
    setSelectedEvent(ensureEventHasImage(event))
  }

  const handleCloseDetailModal = () => {
    setSelectedEvent(null)
  }

  const handleEditEvent = (event) => {
    if (!currentUserId || event.userId !== currentUserId) {
      setError('You can only edit your own events')
      return
    }
    setSelectedEvent(ensureEventHasImage(event))
    setIsEditModalOpen(true)
  }

  const handleSubmitEditModal = async (updatedEvent) => {
    if (updatedEvent) {
      setPendingEditEvent(updatedEvent)
      setConfirmType('edit-submit')
    }
  }

  const handleRequestCloseEditModal = () => {
    if (isEditDirty) {
      setConfirmType('close-edit')
      return
    }
    setIsEditModalOpen(false)
    setIsEditDirty(false)
  }

  const handleConfirm = async () => {
    if (confirmType === 'close-create-dirty' || confirmType === 'close-create-empty') {
      setIsModalOpen(false)
      setIsCreateDirty(false)
    }
    if (confirmType === 'close-edit') {
      setIsEditModalOpen(false)
      setIsEditDirty(false)
    }
    if (confirmType === 'edit-submit' && pendingEditEvent) {
      try {
        // Only send fields that the backend expects
        const eventData = {
          eventName: pendingEditEvent.eventName,
          eventType: pendingEditEvent.eventType,
          description: pendingEditEvent.description,
          hostName: pendingEditEvent.hostName,
          eventDate: pendingEditEvent.eventDate
        }
        const result = await eventService.updateEvent(pendingEditEvent.id, eventData)
        const updatedEventWithImage = ensureEventHasImage({ 
          ...result, 
          eventImage: pendingEditEvent.eventImage 
        })
        // Save image to localStorage for persistence
        saveEventImage(updatedEventWithImage.id, updatedEventWithImage.eventImage)
        setEventsList(prev => prev.map(e => e.id === result.id ? updatedEventWithImage : e))
        setIsEditModalOpen(false)
        setIsEditDirty(false)
        setSelectedEvent(null)
        setPendingEditEvent(null)
      } catch (err) {
        console.error('Error updating event:', err)
        setConfirmMessage('Failed to save changes. Please try again.')
        setConfirmType('error')
        return
      }
    }
    if (confirmType === 'delete' && pendingDeleteEventId) {
      try {
        await eventService.deleteEvent(pendingDeleteEventId)
        localStorage.removeItem(`event-image-${pendingDeleteEventId}`)
        setEventsList(prev => prev.filter(e => e.id !== pendingDeleteEventId))
        setSelectedEvent(null)
        setPendingDeleteEventId(null)
      } catch (err) {
        console.error('Error deleting event:', err)
        setConfirmMessage('Failed to delete event. Please try again.')
        setConfirmType('error')
        return
      }
    }
    if (confirmType === 'create-submit' && pendingCreateEvent) {
      try {
        // Only send fields that the backend expects
        const eventData = {
          eventName: pendingCreateEvent.eventName,
          eventType: pendingCreateEvent.eventType,
          description: pendingCreateEvent.description,
          hostName: pendingCreateEvent.hostName,
          eventDate: pendingCreateEvent.eventDate
        }
        const newEvent = await eventService.createEvent(eventData)
        const eventWithImage = {
          ...newEvent,
          eventImage: pendingCreateEvent.eventImage
        }
        // Save image to localStorage for persistence
        saveEventImage(eventWithImage.id, eventWithImage.eventImage)
        // Add new event and ensure no duplicates
        setEventsList(prev => {
          const filtered = prev.filter(e => e.id !== eventWithImage.id)
          return [eventWithImage, ...filtered]
        })
        setIsModalOpen(false)
        setIsCreateDirty(false)
        setPendingCreateEvent(null)
      } catch (err) {
        console.error('Error creating event:', err)
        setConfirmMessage('Failed to create event. Please try again.')
        setConfirmType('error')
      }
    }
    setConfirmType(null)
    setConfirmMessage('')
  }

  const handleCancelConfirm = () => {
    setConfirmType(null)
    setPendingCreateEvent(null)
    setPendingEditEvent(null)
    setPendingDeleteEventId(null)
    setConfirmMessage('')
  }

  const handleCreateInvalid = (message) => {
    setConfirmMessage(message)
    setConfirmType('create-invalid')
  }

  const getConfirmContent = () => {
    if (confirmType === 'create-submit') {
      return {
        title: 'Create Event',
        message: `Create "${pendingCreateEvent?.eventName || 'this event'}"?`,
        confirmLabel: 'Create',
        cancelLabel: 'Cancel',
        showCancel: true,
        isDanger: false
      }
    }
    if (confirmType === 'edit-submit') {
      return {
        title: 'Save Changes',
        message: `Save changes to "${pendingEditEvent?.eventName || 'this event'}"?`,
        confirmLabel: 'Save',
        cancelLabel: 'Cancel',
        showCancel: true,
        isDanger: false
      }
    }
    if (confirmType === 'error') {
      return {
        title: 'Error',
        message: confirmMessage || 'An error occurred',
        confirmLabel: 'Ok',
        cancelLabel: '',
        showCancel: false,
        isDanger: false
      }
    }
    if (confirmType === 'create-invalid') {
      return {
        title: 'Missing Details',
        message: confirmMessage || 'Please fill out all required fields before creating the event.',
        confirmLabel: 'Ok',
        cancelLabel: '',
        showCancel: false,
        isDanger: false
      }
    }
    if (confirmType === 'close-edit') {
      return {
        title: 'Discard Changes',
        message: 'You have unsaved changes. Are you sure you want to exit the form?',
        confirmLabel: 'Discard',
        cancelLabel: 'Keep Editing',
        showCancel: true,
        isDanger: false
      }
    }
    if (confirmType === 'close-create-dirty') {
      return {
        title: 'Discard Changes',
        message: 'You have unsaved changes. Are you sure you want to exit the form?',
        confirmLabel: 'Discard',
        cancelLabel: 'Keep Editing',
        showCancel: true,
        isDanger: false
      }
    }
    if (confirmType === 'close-create-empty') {
      return {
        title: 'Exit Form',
        message: 'Exit without creating an event?',
        confirmLabel: 'Exit',
        cancelLabel: 'Stay',
        showCancel: true,
        isDanger: false
      }
    }
    if (confirmType === 'delete') {
      const eventToDelete = eventsList.find(e => e.id === pendingDeleteEventId)
      return {
        title: 'Delete Event',
        message: `Are you sure you want to delete "${eventToDelete?.eventName || 'this event'}"? This action cannot be undone.`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        showCancel: true,
        isDanger: true
      }
    }
    return {
      title: '',
      message: '',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      showCancel: true,
      isDanger: false
    }
  }

  const handleDeleteEvent = (eventId) => {
    const eventToDelete = eventsList.find(e => e.id === eventId)
    if (!currentUserId || eventToDelete?.userId !== currentUserId) {
      setError('You can only delete your own events')
      return
    }
    setPendingDeleteEventId(eventId)
    setConfirmType('delete')
  }

  return (
    <div className="events-container">
      <Navbar />
      <h1 className="events-title">Upcoming Events</h1>
      <p>Youth Enlightened empowers young people to create positive change in their communities through education, advocacy, and action. We host engaging workshops and events focused on real world issues like food insecurity, and we also encourage youth to step up and host their own workshops and initiatives to make an impact.</p>
      <p>In partnership with YouthEnlightened, we raise awareness about food insecurity while helping students build practical skills such as coding, finance, marketing, and graphic design that they can use to advocate for solutions and support their communities.</p>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading-message">Loading events...</div>
      ) : (
        <>
          <div className="events-grid">
            {eventsList && eventsList.length > 0 ? (
              eventsList.map((event) => (
                <EventCard
                  key={event.id}
                  eventName={event.eventName}
                  eventImage={event.eventImage}
                  eventType={event.eventType}
                  description={event.description}
                  hostName={event.hostName}
                  eventDate={event.eventDate}
                  color={event.color}
                  onClick={() => handleCardClick(event)}
                />
              ))
            ) : (
              <p className="no-events">No events found</p>
            )}
          </div>
        </>
      )}
      <button className="add-event-button" onClick={handleAddEvent}>+</button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleRequestCloseCreate}>
          <EventFormModal
            onSubmit={handleSubmitCreate}
            onRequestClose={handleRequestCloseCreate}
            onDirtyChange={setIsCreateDirty}
            onInvalidSubmit={handleCreateInvalid}
          />
        </div>
      )}
      {selectedEvent && !isEditModalOpen && (
        <div className="modal-overlay" onClick={handleCloseDetailModal}>
          <EventDetailModal 
            event={selectedEvent} 
            onClose={handleCloseDetailModal}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            canEdit={Boolean(currentUserId) && selectedEvent.userId === currentUserId}
          />
        </div>
      )}
      {isEditModalOpen && selectedEvent && (
        <div className="modal-overlay" onClick={handleRequestCloseEditModal}>
          <EventEditModal 
            event={selectedEvent}
            onSubmit={handleSubmitEditModal}
            onRequestClose={handleRequestCloseEditModal}
            onDirtyChange={setIsEditDirty}
          />
        </div>
      )}
      <ConfirmModal
        show={Boolean(confirmType)}
        title={getConfirmContent().title}
        message={getConfirmContent().message}
        confirmLabel={getConfirmContent().confirmLabel}
        cancelLabel={getConfirmContent().cancelLabel}
        showCancel={getConfirmContent().showCancel}
        isDanger={getConfirmContent().isDanger}
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirm}
      />
    </div>
  )
}

export default Events