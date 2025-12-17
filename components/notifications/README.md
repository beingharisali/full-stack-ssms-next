# Notification System

## Components

### NotificationCenter
- Dropdown notification center with full notification history
- Shows different types of notifications (info, success, warning, error)
- Mark as read/unread functionality
- Clear all notifications
- Real-time updates via Socket.IO

### NotificationBar
- Toast-style notifications that appear at top-right
- Auto-dismiss after 5 seconds
- Different styles for different notification types
- Manual dismiss option

### NotificationBell
- Simple notification count indicator
- Shows unread message count from server

## Fixed Issues

1. **Route Conflict**: Fixed server route ordering where `/messages/unread` was conflicting with `/messages/:ticketId`
2. **MongoDB Aggregation**: Simplified the unread count aggregation pipeline for better performance
3. **Real-time Updates**: Proper Socket.IO event handling for notifications
4. **Component Integration**: Added notification components to the main app layout

## Usage

The notification system is automatically integrated into the app through the providers. No additional setup required.

## API Endpoints

- `GET /api/v1/messages/unread` - Get unread message counts
- Socket events: `notification:new`, `ticket:created`, `ticket:assigned`, `ticket:updated`, `ticket:deleted`