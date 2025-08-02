import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockTickets } from '../../data/mockData';
import TicketCard from '../Tickets/TicketCard';
import TicketFilters from '../Tickets/TicketFilters';
import { TicketFilters as FiltersType } from '../../types/types';
import { Ticket, BarChart3, Users, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<FiltersType>({});

  // Filter tickets based on user role and filters
  const getFilteredTickets = () => {
    let filteredTickets = [...mockTickets];

    // Role-based filtering
    if (user?.role === 'user') {
      filteredTickets = filteredTickets.filter(ticket => ticket.createdBy.id === user.id);
    }

    // Apply filters
    if (filters.status) {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === filters.status);
    }

    if (filters.category) {
      filteredTickets = filteredTickets.filter(ticket => ticket.category.id === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTickets = filteredTickets.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchLower) ||
        ticket.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    const sortBy = filters.sortBy || 'created';
    const sortOrder = filters.sortOrder || 'desc';

    filteredTickets.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'updated':
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
        case 'votes':
          aValue = a.upvotes - a.downvotes;
          bValue = b.upvotes - b.downvotes;
          break;
        case 'replies':
          // Mock replies count
          aValue = Math.floor(Math.random() * 10);
          bValue = Math.floor(Math.random() * 10);
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filteredTickets;
  };

  const filteredTickets = getFilteredTickets();

  // Statistics
  const stats = [
    {
      name: 'Total Tickets',
      value: user?.role === 'user' ? 
        mockTickets.filter(t => t.createdBy.id === user.id).length : 
        mockTickets.length,
      icon: Ticket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Open Tickets',
      value: user?.role === 'user' ?
        mockTickets.filter(t => t.createdBy.id === user.id && t.status === 'open').length :
        mockTickets.filter(t => t.status === 'open').length,
      icon: Clock,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      name: 'In Progress',
      value: user?.role === 'user' ?
        mockTickets.filter(t => t.createdBy.id === user.id && t.status === 'in-progress').length :
        mockTickets.filter(t => t.status === 'in-progress').length,
      icon: BarChart3,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      name: 'Resolved',
      value: user?.role === 'user' ?
        mockTickets.filter(t => t.createdBy.id === user.id && t.status === 'resolved').length :
        mockTickets.filter(t => t.status === 'resolved').length,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.role === 'admin' ? 'Admin Dashboard' : 
           user?.role === 'agent' ? 'Agent Dashboard' : 
           'My Dashboard'}
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.role === 'admin' ? 'Manage all tickets and system settings' :
           user?.role === 'agent' ? 'Handle and resolve support tickets' :
           'Track your support requests'}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-md ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-3xl font-bold text-gray-900">{stat.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <TicketFilters filters={filters} onFiltersChange={setFilters} />

      {/* Tickets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {user?.role === 'user' ? 'My Tickets' : 'Recent Tickets'}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-500">
              {filters.search || filters.status || filters.category
                ? 'Try adjusting your filters to see more results.'
                : 'Get started by creating your first support ticket.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onVote={(ticketId, voteType) => {
                  console.log(`Voted ${voteType} on ticket ${ticketId}`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;