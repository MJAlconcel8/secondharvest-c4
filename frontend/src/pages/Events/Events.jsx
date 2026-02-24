import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import EventCard from '../../components/EventCard/EventCard'
import EventFormModal from '../../components/EventFormModal/EventFormModal'
import EventDetailModal from '../../components/EventDetailModal/EventDetailModal'
import EventEditModal from '../../components/EventEditModal/EventEditModal'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import './Events.scss'

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isCreateDirty, setIsCreateDirty] = useState(false)
  const [isEditDirty, setIsEditDirty] = useState(false)
  const [confirmType, setConfirmType] = useState(null)
  const [pendingCreateEvent, setPendingCreateEvent] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [eventsList, setEventsList] = useState([
    {
      id: 1,
      eventName: 'Food Drive',
      eventImage: 'https://images.unsplash.com/photo-1532996122724-8f3c2cd83c5d?w=500&h=500&fit=crop',
      eventType: 'food',
      description: 'Join us for our annual food drive to help feed families in need. Volunteers welcome!',
      hostName: 'Second Harvest Team',
      eventDate: '2026-03-12',
      color: '#7BB661'
    },
    {
      id: 2,
      eventName: 'Community Harvest',
      eventImage: 'https://images.unsplash.com/photo-1488521787991-3e169b3f44b5?w=500&h=500&fit=crop',
      eventType: 'community',
      description: 'Help us harvest fresh produce from our community garden and distribute to local families.',
      hostName: 'Neighborhood Growers',
      eventDate: '2026-03-22',
      color: '#5A9D4D'
    },
    {
      id: 3,
      eventName: 'Cooking Workshop',
      eventImage: 'https://images.unsplash.com/photo-1556195332-39a4ee5f1b59?w=500&h=500&fit=crop',
      eventType: 'cooking',
      description: 'Learn healthy cooking techniques with our expert chefs. Free for all community members.',
      hostName: 'Chef Elena Rivera',
      eventDate: '2026-04-05',
      color: '#7BB661'
    },
    {
      id: 4,
      eventName: 'Donation Drive',
      eventImage: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=500&fit=crop',
      eventType: 'fundraiser',
      description: 'Bring non-perishable items, clothing, and household goods to support our mission.',
      hostName: 'Community Partners',
      eventDate: '2026-04-18',
      color: '#5A9D4D'
    },
    {
      id: 5,
      eventName: 'Volunteer Day',
      eventImage: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=500&fit=crop',
      eventType: 'community',
      description: 'Together we can make a difference. Sign up to volunteer at our distribution center.',
      hostName: 'Volunteer Hub',
      eventDate: '2026-05-02',
      color: '#7BB661'
    },
    {
      id: 6,
      eventName: 'Kids Nutrition Program',
      eventImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop',
      eventType: 'education',
      description: 'Fun and educational program teaching children about healthy eating habits.',
      hostName: 'Second Harvest Educators',
      eventDate: '2026-05-19',
      color: '#5A9D4D'
    }
  ])

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
    setSelectedEvent(event)
  }

  const handleCloseDetailModal = () => {
    setSelectedEvent(null)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setIsEditModalOpen(true)
  }

  const handleSubmitEditModal = (updatedEvent) => {
    if (updatedEvent) {
      setEventsList(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e))
      setSelectedEvent(updatedEvent)
      setIsEditModalOpen(false)
      setIsEditDirty(false)
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

  const handleConfirm = () => {
    if (confirmType === 'close-create-dirty' || confirmType === 'close-create-empty') {
      setIsModalOpen(false)
      setIsCreateDirty(false)
    }
    if (confirmType === 'close-edit') {
      setIsEditModalOpen(false)
      setIsEditDirty(false)
    }
    if (confirmType === 'create-submit' && pendingCreateEvent) {
      setEventsList(prev => [pendingCreateEvent, ...prev])
      setIsModalOpen(false)
      setIsCreateDirty(false)
      setPendingCreateEvent(null)
    }
    setConfirmType(null)
    setConfirmMessage('')
  }

  const handleCancelConfirm = () => {
    setConfirmType(null)
    setPendingCreateEvent(null)
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
        showCancel: true
      }
    }
    if (confirmType === 'create-invalid') {
      return {
        title: 'Missing Details',
        message: confirmMessage || 'Please fill out all required fields before creating the event.',
        confirmLabel: 'Ok',
        cancelLabel: '',
        showCancel: false
      }
    }
    if (confirmType === 'close-edit') {
      return {
        title: 'Discard Changes',
        message: 'You have unsaved changes. Are you sure you want to exit the form?',
        confirmLabel: 'Discard',
        cancelLabel: 'Keep Editing',
        showCancel: true
      }
    }
    if (confirmType === 'close-create-dirty') {
      return {
        title: 'Discard Changes',
        message: 'You have unsaved changes. Are you sure you want to exit the form?',
        confirmLabel: 'Discard',
        cancelLabel: 'Keep Editing',
        showCancel: true
      }
    }
    if (confirmType === 'close-create-empty') {
      return {
        title: 'Exit Form',
        message: 'Exit without creating an event?',
        confirmLabel: 'Exit',
        cancelLabel: 'Stay',
        showCancel: true
      }
    }
    return {
      title: '',
      message: '',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      showCancel: true
    }
  }

  const handleDeleteEvent = (eventId) => {
    setEventsList(prev => prev.filter(e => e.id !== eventId))
    setSelectedEvent(null)
  }

  return (
    <div className="events-container">
      <Navbar />
      <h1 className="events-title">Upcoming Events</h1>
      <div className="events-grid">
        {eventsList.map((event) => (
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
        ))}
      </div>
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
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirm}
      />
    </div>
  )
}

export default Events