import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from '../../types/types';
import { format } from 'date-fns';
import { Clock, User, ArrowUp, ArrowDown, MessageCircle } from 'lucide-react';

interface TicketCardProps {
  ticket: Ticket;
  showActions?: boolean;
  onVote?: (ticketId: string, voteType: 'up' | 'down') => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, showActions = true, onVote }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`}></div>
              <span className="text-xs text-gray-500 uppercase font-medium">
                {ticket.priority} Priority
              </span>
            </div>
            
            <Link
              to={`/ticket/${ticket.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {ticket.subject}
            </Link>
            
            <p className="text-gray-600 mt-2 line-clamp-2">
              {ticket.description}
            </p>

            <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{ticket.createdBy.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{format(ticket.createdAt, 'MMM d, yyyy')}</span>
              </div>
              {ticket.assignedTo && (
                <div className="flex items-center space-x-1">
                  <span>Assigned to: {ticket.assignedTo.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('-', ' ').toUpperCase()}
            </span>
            
            <div
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{ backgroundColor: ticket.category.color + '20', color: ticket.category.color }}
            >
              {ticket.category.name}
            </div>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onVote?.(ticket.id, 'up')}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-colors duration-200 ${
                  ticket.userVote === 'up'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <ArrowUp className="w-4 h-4" />
                <span>{ticket.upvotes}</span>
              </button>
              
              <button
                onClick={() => onVote?.(ticket.id, 'down')}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-colors duration-200 ${
                  ticket.userVote === 'down'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <ArrowDown className="w-4 h-4" />
                <span>{ticket.downvotes}</span>
              </button>
            </div>

            <Link
              to={`/ticket/${ticket.id}`}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>View Details</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;