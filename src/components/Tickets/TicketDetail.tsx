import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockTickets, mockComments } from '../../data/mockData';
import { format } from 'date-fns';
import {
  ArrowLeft,
  User,
  Clock,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Edit,
  Paperclip,
  Send,
} from 'lucide-react';

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [status, setStatus] = useState('');

  const ticket = mockTickets.find(t => t.id === id);
  const comments = mockComments.filter(c => c.ticketId === id);

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Ticket not found</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

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

  const canModifyTicket = user?.role === 'admin' || user?.role === 'agent' || ticket.createdBy.id === user?.id;
  const canChangeStatus = user?.role === 'admin' || user?.role === 'agent';

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Mock comment submission
    console.log('Adding comment:', newComment);
    setNewComment('');
  };

  const handleStatusChange = (newStatus: string) => {
    console.log('Changing status to:', newStatus);
    setStatus(newStatus);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Ticket Details</h1>
      </div>

      {/* Ticket Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`}></div>
                <span className="text-xs text-gray-500 uppercase font-medium">
                  {ticket.priority} Priority
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">#{ticket.id}</span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {ticket.subject}
              </h2>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Created by {ticket.createdBy.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{format(ticket.createdAt, 'MMM d, yyyy \'at\' h:mm a')}</span>
                </div>
                {ticket.assignedTo && (
                  <div className="flex items-center space-x-1">
                    <span>Assigned to {ticket.assignedTo.name}</span>
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

          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 px-3 py-1 rounded text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200">
                <ArrowUp className="w-4 h-4" />
                <span>{ticket.upvotes}</span>
              </button>
              
              <button className="flex items-center space-x-1 px-3 py-1 rounded text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200">
                <ArrowDown className="w-4 h-4" />
                <span>{ticket.downvotes}</span>
              </button>

              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Paperclip className="w-4 h-4" />
                  <span>{ticket.attachments.length} attachment(s)</span>
                </div>
              )}
            </div>

            {canChangeStatus && (
              <div className="flex items-center space-x-2">
                <select
                  value={status || ticket.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                
                {canModifyTicket && (
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              Comments ({comments.length})
            </h3>
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-gray-900">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(comment.createdAt, 'MMM d, yyyy \'at\' h:mm a')}
                    </span>
                    {comment.isInternal && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Internal
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          {canModifyTicket && (
            <form onSubmit={handleSubmitComment} className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Use @ to mention someone
                    </div>
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;