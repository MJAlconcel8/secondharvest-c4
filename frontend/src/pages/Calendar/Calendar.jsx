import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import EventDetailModal from '../../components/EventDetailModal/EventDetailModal'
import EventEditModal from '../../components/EventEditModal/EventEditModal'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import { eventService } from '../../services/eventService'
import './Calendar.scss'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [eventsList, setEventsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isEditDirty, setIsEditDirty] = useState(false)
  const [confirmType, setConfirmType] = useState(null)
  const [pendingDeleteEventId, setPendingDeleteEventId] = useState(null)

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const events = await eventService.getEvents()
        if (events && events.length > 0) {
          const uniqueEvents = events.filter((event, index, self) =>
            index === self.findIndex((e) => e.id === event.id)
          )
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

  // Get the first day of the month and number of days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  // Get events for a specific date
  const getEventsForDate = (date) => {
    if (!date) return []
    return eventsList.filter(event => {
      const eventDate = new Date(event.eventDate)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Event handlers
  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleCloseDetailModal = () => {
    setSelectedEvent(null)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setIsEditModalOpen(true)
  }

  const handleSubmitEditModal = async (updatedEvent) => {
    if (updatedEvent) {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        const eventData = {
          userId: user.id || 1,
          eventName: updatedEvent.eventName,
          eventType: updatedEvent.eventType,
          description: updatedEvent.description,
          hostName: updatedEvent.hostName,
          eventDate: updatedEvent.eventDate
        }
        const result = await eventService.updateEvent(updatedEvent.id, eventData)
        const updatedEventWithImage = { ...result, eventImage: updatedEvent.eventImage }
        setEventsList(prev => prev.map(e => e.id === result.id ? updatedEventWithImage : e))
        setSelectedEvent(updatedEventWithImage)
        setIsEditModalOpen(false)
        setIsEditDirty(false)
      } catch (err) {
        console.error('Error updating event:', err)
        setError('Failed to update event')
      }
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

  const handleDeleteEvent = (eventId) => {
    setPendingDeleteEventId(eventId)
    setConfirmType('delete')
  }

  const handleConfirm = async () => {
    if (confirmType === 'close-edit') {
      setIsEditModalOpen(false)
      setIsEditDirty(false)
    }
    if (confirmType === 'delete' && pendingDeleteEventId) {
      try {
        await eventService.deleteEvent(pendingDeleteEventId)
        setEventsList(prev => prev.filter(e => e.id !== pendingDeleteEventId))
        setSelectedEvent(null)
        setPendingDeleteEventId(null)
      } catch (err) {
        console.error('Error deleting event:', err)
        setError('Failed to delete event')
      }
    }
    setConfirmType(null)
  }

  const handleCancelConfirm = () => {
    setConfirmType(null)
    setPendingDeleteEventId(null)
  }

  const getConfirmContent = () => {
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

  const calendarDays = getCalendarDays()
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (loading) {
    return (
      <div className="calendar-container">
        <Navbar />
        <div className="loading-message">Loading events...</div>
      </div>
    )
  }

  return (
    <div className="calendar-container">
      <Navbar />
      <div className="calendar-content">
        <h1 className="calendar-title">Event Calendar</h1>
        <p className="calendar-description">This is the calendar page, here you can track all the events that Youth Enlightened or other creative people are hosting. Click on any event to view more details and manage your attendance.</p>
        
        {error && <div className="error-message">{error}</div>}

        <div className="calendar-wrapper">
          <div className="calendar-header">
            <button className="nav-button" onClick={goToPreviousMonth}>←</button>
            <h2 className="calendar-month-year">{monthName}</h2>
            <button className="nav-button" onClick={goToNextMonth}>→</button>
          </div>

          <button className="today-button" onClick={goToToday}>Today</button>

          <div className="calendar-grid">
            {/* Week day headers */}
            {weekDays.map(day => (
              <div key={`header-${day}`} className="week-day-header">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((date, index) => {
              const dayEvents = date ? getEventsForDate(date) : []
              const isToday = date && 
                date.toDateString() === new Date().toDateString()
              const isCurrentMonth = date && 
                date.getMonth() === currentDate.getMonth()

              return (
                <div
                  key={index}
                  className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                >
                  {date && (
                    <>
                      <div className="day-number">{date.getDate()}</div>
                      <div className="day-events">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className="event-item"
                            onClick={() => handleEventClick(event)}
                            title={event.eventName}
                          >
                            {event.eventName}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
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

      {/* Event Edit Modal */}
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

      {/* Confirm Modal */}
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

export default Calendar